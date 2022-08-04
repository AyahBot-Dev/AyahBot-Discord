import { SlashCommandBuilder } from "@discordjs/builders";

import { translations } from "../lib/classes/Ayah";
import {
  invalid_datatype,
  embed_error,
  create_embed,
} from "../lib/embeds/embeds";
import { handleE } from "../lib/utils";
import DBHandler from "../lib/DBHandler";
import { colors } from "../lib/embeds/infos";

import type {
  CacheType,
  CommandInteraction,
  CommandInteractionOption,
  Message,
} from "discord.js";

import type { CustomClient } from "../lib/classes/CustomClient";

export default {
  name: "qdefault",
  description: "Set default quran translation",
  category: "Settings",

  usage: "<translation_key>",

  guildOnly: true,
  cooldown: 5,
  permissions: ["Administrator"],

  slash: new SlashCommandBuilder()
    .setName("qdefault")
    .setDescription("Set default quran translation")
    .addStringOption((option) =>
      option
        .setName("translation")
        .setDescription(
          "Enter a translation code (e.g. 'hilali') from our translations wiki to be default for your server"
        )
        .setRequired(true)
    ),

  async execute(
    message: Message | CommandInteraction,
    args: string[] | readonly CommandInteractionOption<CacheType>[],
    client: CustomClient
  ) {
    try {
      await message.channel.sendTyping();
      let translation: string;

      if (typeof args[0] == "string") translation = args[0];
      if (typeof args[0] == "object") translation = args[0].value as string;

      if (translation == "remove") {
        const quranIsRemoved =
          (await DBHandler.utils.removeQuranTrs(message.guild.id)) !== false;

        if (!quranIsRemoved)
          return await message.reply({ embeds: [embed_error] });

        client.quranTrs.cache.delete(message.guild.id);

        return await message.reply({
          embeds: [
            await create_embed(
              "Custom Quran Translation was removed successfully",
              "In Shaa Allah, from now on, you will receive the default `hilali` translations",
              colors.success
            ),
          ],
        });
      }

      if (!translation || !translations[translation])
        return await message.reply({
          embeds: [
            await invalid_datatype(
              translation,
              "a valid translation code listed [here](https://github.com/AyahBot-Dev/AyahBot-Discord/wiki/Translations)"
            ),
          ],
        });

      const quranIsSet =
        (await DBHandler.settings.store(message.guild.id, translation)) !==
        false;

      if (!quranIsSet) return await message.reply({ embeds: [embed_error] });

      client.quranTrs.cache.set(message.guild.id, translations[translation]);

      return await message.reply({
        embeds: [
          await create_embed(
            "Default Quran translation saved",
            `In Shaa Allah, from now on, you will receive \`${translation}\` translations by default`,
            colors.success
          ),
        ],
      });
    } catch (e) {
      await handleE(e, "qdefault.ts > execute()");
      return await message.reply({ embeds: [embed_error] });
    }
  },
};
