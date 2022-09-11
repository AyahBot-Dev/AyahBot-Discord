import { ActivityType } from "discord.js";

import loadJobs from "../../lib/handlers/jobsLoader";
import loadPrefixes from "../../lib/handlers/prefixesLoader";
import loadQuranTrs from "../../lib/handlers/quranTrsLoader";
import loadSlashes from "../../lib/handlers/slashesLoader";
import { handleE } from "../../lib/utils";

import type { CustomClient } from "../../lib/classes/CustomClient";

export default async (client: CustomClient) => {
  try {
    // load slashes
    await loadJobs(client);
    await loadPrefixes(client);
    await loadQuranTrs(client);
    await loadSlashes(client);

    client.user.setActivity(
      `/help | Assalamu'alaikum wa rahmatullahi wa barakatuh`
    );
  } catch (e) {
    await handleE(e, "ready() event");
    return;
  }
};
