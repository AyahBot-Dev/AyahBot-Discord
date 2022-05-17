import { SlashCommandBuilder } from "@discordjs/builders";

import { Ayah, translations } from "../lib/classes/Ayah.js";
import { embed_error, invalid_datatype } from "../lib/embeds/embeds.js";
import { convertToEmbed, handleE } from "../lib/utils.js";

import type {
  CacheType,
  CommandInteraction,
  CommandInteractionOption,
  Message,
} from "discord.js";

import type { CustomClient } from "../lib/classes/CustomClient.js";

export default {
  name: "random",
  description: "Show a random ayah",
  category: "Random-utils",

  usage: "<translation_key>",

  cooldown: 3,

  slash: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Show a random ayah")
    .addStringOption((option) =>
      option
        .setName("translation")
        .setDescription("Enter a translation code (e.g. 'hilali')")
        .setRequired(false)
    ),

  async execute(
    message: Message | CommandInteraction,
    args: string[] | readonly CommandInteractionOption<CacheType>[],
    client: CustomClient
  ) {
    try {
      await message.channel.sendTyping();
      let translation: string | number;

      if (typeof args[0] == "string") translation = args[0];
      if (typeof args[0] == "object") translation = args[0].value as string;

      if (translation && !translations[translation])
        return await message.reply({
          embeds: [
            await invalid_datatype(
              translation as string,
              "a valid translation code"
            ),
          ],
        });

      if (!translation)
        translation =
          (await (client.quranTrs.cache.get(message.guildId) as number)) ||
          undefined;

      return await message.reply({
        embeds: [await convertToEmbed(await Ayah.random(translation))],
      });
    } catch (e) {
      await handleE(e, "random.ts > execute()");
      return await message.reply({ embeds: [embed_error] });
    }
  },
};
