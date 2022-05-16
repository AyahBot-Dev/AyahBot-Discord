import {
  invalid_datatype,
  embed_error,
  create_embed,
} from "../lib/embeds/embeds";
import { handleE, initJPS } from "../lib/utils";
import { colors } from "../lib/embeds/infos";

import type {
  CacheType,
  CommandInteraction,
  CommandInteractionOption,
  Message,
} from "discord.js";

import type { CustomClient } from "../lib/classes/CustomClient";

export default {
  name: "reload",
  description: "Reload AyahBot",

  usage: "<options>",

  ownerOnly: true,
  cooldown: 3,

  async execute(
    message: Message | CommandInteraction,
    args: string[] | readonly CommandInteractionOption<CacheType>[],
    client: CustomClient
  ) {
    try {
      await message.channel.sendTyping();
      // reload
      // for that first check args - done

      let option: string;
      const options = ["jobs", "prefixes", "quranTrs", "slashes"];

      if (typeof args[0] == "string") option = args[0];
      if (typeof args[0] == "object") option = args[0].value as string;

      // now begin all of'em

      // first see if option exists in reloadable things
      if (option && !options.includes(option))
        return await message.reply({
          embeds: [await invalid_datatype(option, "a valid reloadable item")],
        });

      if (option)
        return await (await import(`../lib/handlers/${option}Loader`))
          .default(client)
          .then(
            async () =>
              await message.reply({
                embeds: [
                  await create_embed(
                    "Successfully reloaded",
                    `Successfully reloaded all ${option}`,
                    colors.success
                  ),
                ],
              })
          );

      // else reload all
      // clear cache - not able in esm import
      await initJPS(client);

      return await message.reply({
        embeds: [
          await create_embed(
            "Successfully reloaded",
            `Successfully reloaded everything`,
            colors.success
          ),
        ],
      });
    } catch (e) {
      await handleE(e, "reload.ts > execute()");
      return await message.reply({ embeds: [embed_error] });
    }
  },
};
