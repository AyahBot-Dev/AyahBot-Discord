import { ChannelType, SlashCommandBuilder } from "discord.js";

import DBHandler from "../lib/DBHandler";
import {
  embed_error,
  create_embed,
  invalid_datatype,
  syntax_error,
} from "../lib/embeds/embeds";
import { colors } from "../lib/embeds/infos";
import { handleE } from "../lib/utils";

import type {
  CacheType,
  CommandInteraction,
  CommandInteractionOption,
  Message,
} from "discord.js";

import type { Lang } from "../types";

export default {
  name: "schedule",
  description: "Schedule daily ayahs",
  category: "Settings",

  usage: "<channel's mention> <time (in 24 hours format)> <ayah_type>",

  guildOnly: true,
  cooldown: 5,
  permissions: ["Administrator"],

  slash: new SlashCommandBuilder()
    .setName("schedule")
    .setDescription("Schedule daily ayahs")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Select the channel you're wanting me to schedule at")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("time")
        .setDescription(
          "Enter the time (in 24 hours format) when you want me to send ayahs daily"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("ayah_type")
        .setDescription(
          "Select any of 'Translated', 'Arabic' and 'Both' to show them daily"
        )
        .setRequired(true)
        .addChoices(
          { name: "Translated", value: "translated" },
          { name: "Arabic", value: "arabic" },
          { name: "Both", value: "both" }
        )
    ),

  async execute(
    message: Message | CommandInteraction,
    args: string[] | readonly CommandInteractionOption<CacheType>[]
  ) {
    try {
      await message.channel.sendTyping();

      let channelIdU: string, time: string, ayah_type: string;

      if (
        typeof args[0] == "string" &&
        typeof args[1] == "string" &&
        typeof args[2] == "string"
      ) {
        channelIdU = args[0];
        time = args[1];
        ayah_type = args[2].toLowerCase();
      }

      if (
        typeof args[0] == "object" &&
        typeof args[1] == "object" &&
        typeof args[2] == "object"
      ) {
        channelIdU = `<#${args[0].value}>`;
        time = args[1].value as string;
        ayah_type = (args[2].value as string).toLowerCase();
      }
      // First: check if channelId and time are in correct format
      if (
        !/^<#(\d{10,})>$/.test(channelIdU) ||
        !/^\d{1,2}:\d{2}$/.test(time) ||
        !(args.length === 3)
      )
        return await message.reply({
          embeds: [
            await syntax_error(
              "<channel's @>",
              "<time (in 24 hrs format)>",
              "<ayah_type>"
            ),
          ],
        });

      if (!["translated", "arabic", "both"].includes(ayah_type))
        return await message.reply({
          embeds: [
            await invalid_datatype(
              ayah_type,
              "any of 'translated', 'arabic' and 'both'"
            ),
          ],
        });

      const channelId = channelIdU.substring(2, channelIdU.indexOf(">"));
      if (!message.guild.channels.cache.has(channelId))
        return await message.reply({
          embeds: [
            await create_embed(
              "Channel not found",
              `The channel ${channelIdU} doesn't exist. Maybe forgot to create that?`,
              colors.error
            ),
          ],
        });

      // check perms
      const channel = await message.guild.channels.cache.get(channelId);
      const hasPerms = await message.guild.members.me
        .permissionsIn(channel)
        .has(["SendMessages", "ViewChannel", "EmbedLinks"]);

      if (!hasPerms)
        return await message.reply({
          embeds: [
            await create_embed(
              "Insufficient permission I have",
              `I don't have permission to view, send messages \nand send embeds in ${channelIdU}. I at least need permissions to view the channel, send embeds and messages`,
              colors.warning
            ),
          ],
        });

      if (channel.type != ChannelType.GuildText)
        return await message.reply({
          embeds: [
            await create_embed(
              "Only Text channels supported",
              `I can't send messages and embeds in ${channelIdU} as it's not a text channel`,
              colors.warning
            ),
          ],
        });

      const [hh, mm] = time.split(":").map(Number);
      // Second: check if time valid
      if (hh > 23 || hh < 0 || mm < 0 || mm > 59)
        return await message.reply({
          embeds: [
            await invalid_datatype(time, "a valid time in 24 hrs format"),
          ],
        });

      // Fourth: create a schedule from createSchedule() function
      const res =
        (await DBHandler.settings.store(
          message.guild.id,
          undefined,
          undefined,
          channelId,
          `${mm} ${hh}`,
          undefined,
          { translated: "en", arabic: "ar", both: "mixed" }[ayah_type] as Lang
        )) !== false &&
        (await DBHandler.scheduler.init(
          message.guild,
          channelId,
          `${mm} ${hh} * * *`
        ));

      if (res === null)
        return await message.reply({
          embeds: [
            await create_embed(
              "Timezone unconfigured",
              "You have not configured your timezone yet. Configure it with this command: !ayah timezone <your_timezone>",
              colors.error
            ),
          ],
        });

      if (!res) return await message.reply({ embeds: [embed_error] });

      return await message.reply({
        embeds: [
          await create_embed(
            "Schedules saved",
            `In Shaa Allah, from now on, everyday ${ayah_type} ayahs will be sent in ${channelIdU} at ${time}`,
            colors.success
          ),
        ],
      });
    } catch (e) {
      await handleE(e, "schedule.ts > execute()");
      return await message.reply({ embeds: [embed_error] });
    }
  },
};
