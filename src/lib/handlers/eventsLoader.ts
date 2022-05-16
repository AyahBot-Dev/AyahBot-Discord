import * as fs from "fs/promises";

import type { CustomClient } from "../classes/CustomClient";

/* istanbul ignore next */
export default async (client: CustomClient) => {
  const load_dir = async (dir: string) => {
    const t1 = new Date().getTime();
    const events_files = await fs
      .readdir(`./src/events/${dir}`)
      .then(async (files) => files.filter((file) => file.endsWith(".ts")));

    for (const file of events_files) {
      const event_name = file.split(".")[0];
      const event = await import(`../../events/${dir}/${event_name}`);
      console.log(event.messageCreate);
      client.on(event_name, event.default.bind(null, client));
    }

    const t2 = new Date().getTime();

    console.log(
      `Successfully loaded %d ${dir} commands %dms`,
      events_files.length,
      t2 - t1
    );
  };

  for (const dir of ["client", "guild"]) {
    await load_dir(dir);
  }
  return;
};
