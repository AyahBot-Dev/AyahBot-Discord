import { create_embed } from "../lib/embeds/embeds";
import { cleanupAll } from "../lib/utils";
import { colors } from "../lib/embeds/infos";
import { db } from "../lib/initDB";

import type {
  CacheType,
  CommandInteraction,
  CommandInteractionOption,
  Message,
} from "discord.js";

import type { CustomClient } from "../lib/classes/CustomClient";

export default {
  name: "shutdown",
  description: "Shutdown AyahBot",

  usage: "<options>",

  ownerOnly: true,
  cooldown: 3,

  async execute(
    message: Message | CommandInteraction,
    _args: string[] | readonly CommandInteractionOption<CacheType>[],
    client: CustomClient
  ) {
    /* shutdown workflow:
        1. turn off database
        2. destroy client
        3. exit the process
      */

    await message.reply({
      embeds: [
        await create_embed(
          "Allah hafez",
          "I am also gonna be down shortly, Allah hafez!",
          colors.success
        ),
      ],
    });

    return cleanupAll(db, client);
  },
};
