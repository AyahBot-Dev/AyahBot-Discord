import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";

import type { CustomClient } from "../classes/CustomClient";
import { handleE } from "../utils";

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

/* istanbul ignore next */
export default async (client: CustomClient) => {
  try {
    const t1 = new Date().getTime();
    const commands = [];
    client.commands.forEach((command) =>
      command.slash ? commands.push(command.slash.toJSON()) : null
    );

    console.log("Started refreshing application (/) commands.");

    if (process.env.SERVER_ID)
      await rest.put(
        Routes.applicationGuildCommands(client.user.id, process.env.SERVER_ID),
        {
          body: commands,
        }
      );

    await rest.put(Routes.applicationCommands(client.user.id), {
      body: commands,
    });

    const t2 = new Date().getTime();
    console.log(
      `Successfully reloaded application (/) commands in ${t2 - t1}ms.`
    );
    return;
  } catch (e) {
    await handleE(e, "slashesLoader.ts");
    return;
  }
};
