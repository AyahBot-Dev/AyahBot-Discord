import { SlashCommandBuilder } from "discord.js";
import moment from "moment-timezone";

import {
  syntax_error,
  invalid_datatype,
  embed_error,
  create_embed,
} from "../lib/embeds/embeds";
import { colors } from "../lib/embeds/infos";
import DBHandler from "../lib/DBHandler";

import type {
  CacheType,
  CommandInteraction,
  CommandInteractionOption,
  Message,
} from "discord.js";

export default {
  name: "timezone",
  description: "Set timezone for scheduled ayahs",
  category: "Settings",

  usage: "<timezone>",

  guildOnly: true,
  cooldown: 5,
  permissions: ["Administrator"],

  slash: new SlashCommandBuilder()
    .setName("timezone")
    .setDescription("Set timezone for scheduled ayahs")
    .addStringOption((option) =>
      option
        .setName("timezone")
        .setDescription("Enter a timezone (e.g. 'Asia/Dhaka')")
        .setRequired(true)
    ),

  async execute(
    message: Message | CommandInteraction,
    args: string[] | readonly CommandInteractionOption<CacheType>[]
  ) {
    // First: check if timezone valid
    if (!args[0])
      return await message.reply({
        embeds: [await syntax_error("<timezone (e.g. Asia/Dhaka)>")],
      });

    let timezone: string;

    if (typeof args[0] == "string") timezone = args[0];
    if (typeof args[0] == "object") timezone = args[0].value as string;

    // let tzIsValid = await isValidTZ(args[0]);
    if (!moment.tz.zone(timezone))
      return await message.reply({
        embeds: [
          await invalid_datatype(
            timezone,
            "a valid timezone listed [here](https://github.com/AyahBot-Dev/AyahBot-Discord/wiki/Timezones)"
          ),
        ],
      });

    // Second: try to store the timezone value, show error if returned false
    const res =
      (await DBHandler.settings.store(
        message.guild.id,
        undefined,
        timezone
      )) !== false &&
      (await DBHandler.scheduler.updateTZ(message.guild.id, timezone));

    if (!res && res !== null)
      return await message.reply({ embeds: [embed_error] });

    return await message.reply({
      embeds: [
        await create_embed(
          "Timezone settings: ",
          "Timezone changes saved",
          colors.success
        ),
      ],
    });
  },
};
