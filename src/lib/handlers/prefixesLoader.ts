import DBHandler from "../DBHandler.js";
import { handleE } from "../utils.js";

import type { CustomClient } from "../classes/CustomClient.js";

/* istanbul ignore next */
export default async (client: CustomClient) => {
  try {
    const t1 = new Date().getTime();

    // load prefixes
    const data = await DBHandler.utils.fetchAll();
    for (const k in data) {
      const guild = client.guilds.cache.has(k);

      if (!guild) {
        await DBHandler.utils.removeGuild(k);
        continue;
      }

      if (!data[k].prefix) continue;

      client.prefixes.cache.set(k, data[k].prefix);
    }
    const t2 = new Date().getTime();

    console.log(
      "Successfully loaded %d prefixes in %dms",
      client.prefixes.cache.size,
      t2 - t1
    );
    return;
  } catch (e) {
    await handleE(e, "prefixesLoader.ts");
    console.error("I could not load all the prefixes!: \n", e);
    return;
  }
};
