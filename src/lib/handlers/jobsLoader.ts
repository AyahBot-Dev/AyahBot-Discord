import { Api } from "@top-gg/sdk";
import schedule from "node-schedule";

import { cronTZ, handleE, task } from "../utils";
import DBHandler from "../DBHandler";

import type { CustomClient } from "../classes/CustomClient";

/* istanbul ignore next */
export default async (client: CustomClient) => {
  try {
    console.time("Time taken");

    if (process.env.TOP_GG_TOKEN) {
      schedule.scheduleJob("utils", "0 */6 * * *", async () => {
        try {
          let api = new Api(process.env.TOP_GG_TOKEN);
          api.postStats({
            serverCount: client.guilds.cache.size,
            shardId: client.shard?.ids[0],
            shardCount: client.options.shardCount || 1,
          });
          api = null;
        } catch (e) {
          await handleE(e, "api.postStats()");
          return;
        }
      });
    }

    // load jobs
    const data = await DBHandler.settings.fetchAll();
    for (const k in data) {
      const dG = data[k];
      const guild = client.guilds.cache.get(k);
      if (!guild) {
        await DBHandler.settings.removeGuild(k);
        continue;
      }

      if (!dG.spec || !dG.channel || !dG.timezone) continue;

      const [mm, hh] = dG.spec.split(" ");
      const spec = await cronTZ(dG.timezone, `${mm} ${hh} * * *`);
      schedule.scheduleJob(
        k,
        spec,
        await task.bind(null, dG.quran, dG.lang, guild, dG.channel)
      );
    }

    console.log(
      "Successfully loaded %d jobs.",
      Object.keys(schedule.scheduledJobs).length
    );
    console.timeEnd("Time taken");
    return;
  } catch (e) {
    await handleE(e, "jobsLoader.ts");
    console.error("I could not load all the jobs!: \n", e);
    return;
  }
};
