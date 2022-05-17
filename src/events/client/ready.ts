import loadJobs from "../../lib/handlers/jobsLoader.js";
import loadPrefixes from "../../lib/handlers/prefixesLoader.js";
import loadQuranTrs from "../../lib/handlers/quranTrsLoader.js";
import loadSlashes from "../../lib/handlers/slashesLoader.js";
import { handleE } from "../../lib/utils.js";

import type { CustomClient } from "../../lib/classes/CustomClient.js";

export default async (client: CustomClient) => {
  try {
    // load slashes
    await loadJobs(client);
    await loadPrefixes(client);
    await loadQuranTrs(client);
    await loadSlashes(client);
  } catch (e) {
    await handleE(e, "ready() event");
    return;
  }
};
