import { SlashCommandBuilder } from "discord.js";

import {
  invalid_datatype,
  embed_error,
  create_embed,
  syntax_error,
} from "../lib/embeds/embeds";
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
  name: "prefix",
  description: "Set a custom prefix for your server",
  category: "Settings",

  usage: "<prefix>",

  guildOnly: true,
  cooldown: 3,
  permissions: ["Administrator"],

  slash: new SlashCommandBuilder()
    .setName("prefix")
    .setDescription("Set a custom prefix for your server")
    .addStringOption((option) =>
      option
        .setName("prefix")
        .setDescription(
          `Enter a custom prefix (e.g. '!', not containing \`, ', " or spaces) for your server`
        )
        .setRequired(true)
    ).setDMPermission(false),

  async execute(
    message: Message | CommandInteraction,
    args: string[] | readonly CommandInteractionOption<CacheType>[],
    client: CustomClient
  ) {
    if (!args[0])
      return await message.reply({
        embeds: [await syntax_error(`<prefix (e.g. '!')>`)],
      });

    let prefix: string;

    if (typeof args[0] == "string") prefix = args[0];
    if (typeof args[0] == "object") prefix = args[0].value as string;

    if (
      prefix.includes(`\``) ||
      prefix.includes(`'`) ||
      prefix.includes(`"`) ||
      /\s/.test(prefix)
    )
      return await message.reply({
        embeds: [
          await invalid_datatype(
            `\`\`${prefix}\`\``,
            `a valid prefix (must not contain \`, ', " or spaces)`
          ),
        ],
      });

    if (prefix == "remove") {
      const prefixIsRemoved =
        (await DBHandler.settings.remove(message.guild.id, "prefix")) !== false;

      if (!prefixIsRemoved)
        return await message.reply({ embeds: [embed_error] });

      client.prefixes.cache.delete(message.guild.id);

      return await message.reply({
        embeds: [
          await create_embed(
            "Prefix was removed successfully",
            "The custom prefix of your server was removed and set to the default `!ayah `",
            colors.success
          ),
        ],
      });
    }

    const prefixIsSet =
      (await DBHandler.settings.store(
        message.guild.id,
        undefined,
        undefined,
        undefined,
        undefined,
        prefix
      )) !== false;

    if (!prefixIsSet) return await message.reply({ embeds: [embed_error] });

    client.prefixes.cache.set(message.guild.id, prefix);

    return await message.reply({
      embeds: [
        await create_embed(
          "Prefix was set successfully",
          `The prefix of your server was set to \`${prefix}\``,
          colors.success
        ),
      ],
    });
  },
};
