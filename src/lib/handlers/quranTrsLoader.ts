import DBHandler from "../DBHandler";
import { handleE } from "../utils";

import type { CustomClient } from "../classes/CustomClient";

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

      if (!data[k].quran) continue;

      client.quranTrs.cache.set(k, data[k].quran);
    }
    const t2 = new Date().getTime();

    console.log(
      "Successfully loaded %d quran translations in %dms",
      client.quranTrs.cache.size,
      t2 - t1
    );
    return;
  } catch (e) {
    await handleE(e, "quranTrsLoader.ts");
    console.error("I could not load all the quran translations!: \n", e);
    return;
  }
};
