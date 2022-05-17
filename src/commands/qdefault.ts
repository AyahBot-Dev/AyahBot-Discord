import { SlashCommandBuilder } from "@discordjs/builders";

import { translations } from "../lib/classes/Ayah.js";
import {
  invalid_datatype,
  embed_error,
  create_embed,
} from "../lib/embeds/embeds.js";
import { handleE } from "../lib/utils.js";
import DBHandler from "../lib/DBHandler.js";
import { colors } from "../lib/embeds/infos.js";

import type {
  CacheType,
  CommandInteraction,
  CommandInteractionOption,
  Message,
} from "discord.js";

import type { CustomClient } from "../lib/classes/CustomClient.js";

export default {
  name: "qdefault",
  description: "Set default quran translation",
  category: "Settings",

  usage: "<translation_key>",

  guildOnly: true,
  cooldown: 5,
  permissions: ["ADMINISTRATOR"],

  slash: new SlashCommandBuilder()
    .setName("qdefault")
    .setDescription("Set default quran translation")
    .addStringOption((option) =>
      option
        .setName("translation")
        .setDescription(
          "Enter a translation code (e.g. 'hilali') to be default for your server"
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
            await invalid_datatype(translation, "a valid translation code"),
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
