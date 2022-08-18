import { SlashCommandBuilder } from "discord.js";

import { Ayah } from "../lib/classes/Ayah";
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

export default {
  name: "aquran",
  description: "Show an arabic ayah from quran using verse key",
  category: "Quran",

  usage: "<verse_key>",

  cooldown: 2,

  slash: new SlashCommandBuilder()
    .setName("aquran")
    .setDescription("Show an arabic ayah from quran using verse key")
    .addStringOption((option) =>
      option
        .setName("verse_key")
        .setDescription(
          "Enter a verse key (a surah:ayah pair, e.g. '3:157', '3:100-105')"
        )
        .setRequired(true)
    ),

  async execute(
    message: Message | CommandInteraction,
    args: string[] | readonly CommandInteractionOption<CacheType>[]
  ) {
    try {
      await message.channel.sendTyping();

      if (!args[0])
        return await message.reply({
          embeds: [await syntax_error("<verse_key (e.g. 3:157 or 3:100-105)>")],
        });

      let verse_key: string;

      if (typeof args[0] == "string") verse_key = args[0];
      if (typeof args[0] == "object") verse_key = args[0].value as string;

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
            await convertToEmbed(await Ayah.fetch(verse_key, undefined, "ar")),
          ],
        });
      else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return await (message as any).editReply({
          embeds: [
            await convertToEmbed(await Ayah.fetch(verse_key, undefined, "ar")),
          ],
        });
      }
    } catch (e) {
      await handleE(e, "aquran.ts > execute()");
      return await message.reply({ embeds: [embed_error] });
    }
  },
};
