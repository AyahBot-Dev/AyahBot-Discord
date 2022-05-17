import schedule from "node-schedule";

import { cronTZ, handleE, task } from "../utils.js";
import DBHandler from "../DBHandler.js";

import type { CustomClient } from "../classes/CustomClient.js";

/* istanbul ignore next */
export default async (client: CustomClient) => {
  try {
    const t1 = new Date().getTime();

    // load jobs
    const data = await DBHandler.utils.fetchAll();
    for (const k in data) {
      const dG = data[k];
      const guild = client.guilds.cache.get(k);
      if (!guild) {
        await DBHandler.utils.removeGuild(k);
        continue;
      }

      if (!dG.spec || !dG.channel || !dG.timezone) continue;

      const [mm, hh] = dG.spec.split(" ");
      const spec = await cronTZ(dG.timezone, `${mm} ${hh} * * *`);
      schedule.scheduleJob(
        k,
        spec,
        await task.bind(null, dG.quran || 203, guild, dG.channel)
      );
    }

    const t2 = new Date().getTime();

    console.log(
      "Successfully loaded %d jobs in %dms",
      Object.keys(schedule.scheduledJobs).length,
      t2 - t1
    );
    return;
  } catch (e) {
    await handleE(e, "jobsLoader.ts");
    console.error("I could not load all the jobs!: \n", e);
    return;
  }
};
