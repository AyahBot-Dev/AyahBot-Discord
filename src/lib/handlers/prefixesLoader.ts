import DBHandler from "../DBHandler";
import { handleE } from "../utils";

import type { CustomClient } from "../classes/CustomClient";

/* istanbul ignore next */
export default async (client: CustomClient) => {
  try {
    console.time("Time taken");
    // load prefixes
    const data = await DBHandler.settings.fetchAll();
    for (const k in data) {
      const guild = client.guilds.cache.has(k);

      if (!guild) {
        await DBHandler.settings.removeGuild(k);
        continue;
      }

      if (!data[k].prefix) continue;

      client.prefixes.cache.set(k, data[k].prefix);
    }

    console.log("Successfully loaded %d prefixes", client.prefixes.cache.size);
    console.timeEnd("Time taken");
    return;
  } catch (e) {
    await handleE(e, "prefixesLoader.ts");
    console.error("I could not load all the prefixes!: \n", e);
    return;
  }
};
