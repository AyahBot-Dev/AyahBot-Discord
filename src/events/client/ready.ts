import { Api } from "@top-gg/sdk";

import loadJobs from "../../lib/handlers/jobsLoader";
import type { CustomClient } from "../../lib/classes/CustomClient";
import loadPrefixes from "../../lib/handlers/prefixesLoader";
import loadQuranTrs from "../../lib/handlers/quranTrsLoader";
import loadSlashes from "../../lib/handlers/slashesLoader";
import { cleanupAll, handleE } from "../../lib/utils";
import { db } from "../../lib/initDB";

export default async (client: CustomClient) => {
  try {
    // load slashes
    await loadJobs(client);
    await loadPrefixes(client);
    await loadQuranTrs(client);
    await loadSlashes(client);

    if (process.env.TOP_GG_TOKEN) {
      let api = new Api(process.env.TOP_GG_TOKEN);
      api.postStats({
        serverCount: client.guilds.cache.size,
        shardId: client.shard?.ids[0],
        shardCount: client.options.shardCount || 1,
      });
      api = null;
    }

    client.user.setActivity(
      `/help | Assalamu'alaikum wa rahmatullahi wa barakatuh`
    );
  } catch (e) {
    await handleE(e, "ready() event");
    cleanupAll(db, client);
    return;
  }
};
