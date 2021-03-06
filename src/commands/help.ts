import { SlashCommandBuilder } from "@discordjs/builders";

import { invalid_datatype, embed_error } from "../lib/embeds/embeds";
import { handleE } from "../lib/utils";

import type {
  CacheType,
  CommandInteraction,
  CommandInteractionOption,
  Message,
} from "discord.js";

import type { CustomClient } from "../lib/classes/CustomClient";

export default {
  name: "help",
  description: "Show AyahBot help page",

  usage: "<options>",

  cooldown: 3,

  slash: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show AyahBot help page")
    .addStringOption((option) =>
      option
        .setName("options")
        .setDescription("Enter the category you are wanting to know")
    ),

  async execute(
    message: Message | CommandInteraction,
    args: string[] | readonly CommandInteractionOption<CacheType>[],
    client: CustomClient
  ) {
    try {
      await message.channel.sendTyping();

      let option: string;

      if (typeof args[0] == "string") option = args[0];
      if (typeof args[0] == "object") option = args[0].value as string;

      // now begin all of'em

      if (
        option &&
        !client.helpCommands.has(
          option[0].toUpperCase() + option.slice(1).toLowerCase()
        )
      )
        return await message.reply({
          embeds: [
            await invalid_datatype(option, "a valid category from the list"),
          ],
        });

      if (option)
        return await message.reply({
          embeds: [
            await client.helpCommands.get(
              option[0].toUpperCase() + option.slice(1).toLowerCase()
            ),
          ],
        });

      return await message.reply({
        embeds: [await client.helpCommands.get("main")],
      });

      //
    } catch (e) {
      await handleE(e, "help.ts > execute()");
      return await message.reply({ embeds: [embed_error] });
    }
  },
};
