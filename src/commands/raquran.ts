import { SlashCommandBuilder } from "discord.js";

import { Ayah } from "../lib/classes/Ayah";
import { embed_error } from "../lib/embeds/embeds";
import { convertToEmbed, handleE } from "../lib/utils";

import type { CommandInteraction, Message } from "discord.js";

export default {
  name: "raquran",
  description: "Show a random arabic ayah",
  category: "Random-utils",

  usage: "",

  cooldown: 3,

  slash: new SlashCommandBuilder()
    .setName("raquran")
    .setDescription("Show a random arabic ayah"),

  async execute(message: Message | CommandInteraction) {
    try {
      await message.channel.sendTyping();

      return await message.reply({
        embeds: [
          await convertToEmbed(await Ayah.random(undefined, false, "ar")),
        ],
      });
    } catch (e) {
      await handleE(e, "raquran.ts > execute()");
      return await message.reply({ embeds: [embed_error] });
    }
  },
};
