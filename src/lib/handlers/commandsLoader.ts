/*istanbul ignore next */
import * as fs from "fs/promises";

import type { CustomClient } from "../classes/CustomClient";

/* istanbul ignore next */
export default async (client: CustomClient) => {
  const t1 = new Date().getTime();
  /* istanbul ignore next */
  const command_files = await fs /*istanbul ignore next */
    .readdir("./src/commands")
    .then(async (file: string[]) =>
      file.filter((file) =>
        file.endsWith(process.env.NODE_ENV == "production" ? ".js" : ".ts")
      )
    );
  /* istanbul ignore next */
  for (const file of command_files) {
    const command = await import(`../../commands/${file}`);
    if (command.default.name)
      client.commands.set(command.default.name, command.default);
  }

  const t2 = new Date().getTime();

  console.log(
    "Successfully loaded %d commands in %dms",
    client.commands.size,
    t2 - t1
  );
  return;
};
