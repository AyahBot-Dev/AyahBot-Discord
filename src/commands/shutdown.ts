import { embed_error, create_embed } from "../lib/embeds/embeds";
import { handleE } from "../lib/utils";
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
    try {
      await message.channel.sendTyping();
      /* shutdown workflow:
        1. turn off database
        2. destroy client
        3. exit the process
      */

      // turn off database
      db.goOffline();

      // destroy client
      // send a last message before destruction
      await message.reply({
        embeds: [
          await create_embed(
            "Allah hafez",
            "The database has gone offline and I am also gonna be down shortly, Allah hafez!",
            colors.success
          ),
        ],
      });

      client.destroy();

      // exit the process
      process.exit(0);
    } catch (e) {
      await handleE(e, "shutdown.ts > execute()");
      return (await message.reply({ embeds: [embed_error] })) || null;
    }
  },
};
