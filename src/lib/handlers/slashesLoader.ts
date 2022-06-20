import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import type { CustomClient } from "../classes/CustomClient";
import { handleE } from "../utils";

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

/* istanbul ignore next */
export default async (client: CustomClient) => {
  try {
    const t1 = new Date().getTime();
    const commands = [];
    client.commands.forEach((command) =>
      command.slash ? commands.push(command.slash.toJSON()) : null
    );

    console.log("Started refreshing application (/) commands.");

    if (!client.application?.owner) await client.application?.fetch();

    await client.guilds.cache.get(process.env.SERVER_ID)?.commands.fetch();

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
