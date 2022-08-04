import { SlashCommandBuilder } from "@discordjs/builders";

import { Ayah, translations } from "../lib/classes/Ayah";
import {
  syntax_error,
  invalid_datatype,
  embed_error,
} from "../lib/embeds/embeds";
import { handleE, convertToEmbed } from "../lib/utils";

import type {
  CacheType,
  CommandInteraction,
  CommandInteractionOption,
  Message,
} from "discord.js";

import type { CustomClient } from "../lib/classes/CustomClient";

export default {
  name: "quran",
  description: "Show an ayah from quran using verse key",
  category: "Quran",

  usage: "<verse_key> <translation_key>",

  cooldown: 2,

  slash: new SlashCommandBuilder()
    .setName("quran")
    .setDescription("Show an ayah from quran using verse key")
    .addStringOption((option) =>
      option
        .setName("verse_key")
        .setDescription(
          "Enter a verse key (a surah:ayah pair, e.g. '3:157', '3:100-105')"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("translation")
        .setDescription(
          "Enter a translation code (e.g. 'hilali') from our translations wiki"
        )
        .setRequired(false)
    ),

  async execute(
    message: Message | CommandInteraction,
    args: string[] | readonly CommandInteractionOption<CacheType>[],
    client: CustomClient
  ) {
    try {
      await message.channel.sendTyping();

      if (!args[0])
        return await message.reply({
          embeds: [await syntax_error("<verse_key (e.g. 3:157 or 3:100-105)>")],
        });

      let translation: string | number, verse_key: string;

      if (typeof args[0] == "string") {
        verse_key = args[0];
        translation = args[1] as string | undefined;
      }

      if (typeof args[0] == "object") verse_key = args[0].value as string;
      if (typeof args[1] == "object") translation = args[1].value as string;

      if (translation && !translations[translation])
        return await message.reply({
          embeds: [
            await invalid_datatype(
              translation as string,
              "a valid translation code listed [here](https://github.com/AyahBot-Dev/AyahBot-Discord/wiki/Translations)"
            ),
          ],
        });

      if (!translation)
        translation =
          (await (client.quranTrs.cache.get(message.guildId) as number)) ||
          undefined;

      const isSingle = /^\d{1,}:\d{1,}$/.test(verse_key);
      const isMultiple = /^\d{1,}:\d{1,}-\d{1,}$/.test(verse_key);
      const [surah, verse] = isMultiple
        ? verse_key.split(":").map((v, i) => (i == 0 ? Number(v) : v))
        : verse_key.split(":").map(Number);
      const verseArr = isMultiple ? String(verse).split("-").map(Number) : null;
      const isValid =
        surah <= 114 &&
        surah >= 1 &&
        (isSingle
          ? verse > 0 && verse < 287
          : isMultiple
          ? verseArr[0] > 0 &&
            verseArr[0] < 287 &&
            verseArr[1] > 0 &&
            verseArr[1] < 287
          : false);
      if (!isValid)
        return await message.reply({
          embeds: [await invalid_datatype(verse_key, "a valid verse key")],
        });
      let d = 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (isMultiple && (message as any).options)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (message as any).deferReply() && d++;

      if (!d)
        return await message.reply({
          embeds: [
            await convertToEmbed(await Ayah.fetch(verse_key, translation)),
          ],
        });
      else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return await (message as any).editReply({
          embeds: [
            await convertToEmbed(await Ayah.fetch(verse_key, translation)),
          ],
        });
      }
    } catch (e) {
      await handleE(e, "quran.ts > execute()");
      return await message.reply({ embeds: [embed_error] });
    }
  },
};
