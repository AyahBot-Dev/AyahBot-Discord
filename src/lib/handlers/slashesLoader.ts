import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";

import type { CustomClient } from "../classes/CustomClient";
import { handleE } from "../utils";

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

/* istanbul ignore next */
export default async (client: CustomClient) => {
	try {
		console.time("Time taken");
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

		console.log("Successfully reloaded application (/) commands.");
		console.timeEnd("Time taken");
		return;
	} catch (e) {
		await handleE(e, "slashesLoader.ts");
		return;
	}
};
