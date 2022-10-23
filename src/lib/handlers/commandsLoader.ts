/*istanbul ignore next */
import * as fs from "fs/promises";

import type { CustomClient } from "../classes/CustomClient";

/* istanbul ignore next */
export default async (client: CustomClient) => {
  console.time("Time taken");
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

  console.log("Successfully loaded %d commands", client.commands.size);
  console.timeEnd("Time taken");
  return;
};
