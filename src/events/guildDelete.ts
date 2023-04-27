import { scheduledJobs } from "node-schedule";

import DBHandler from "../lib/DBHandler";
import { handleE } from "../lib/utils";

import type { Guild } from "discord.js";
import type { CustomClient } from "../lib/classes/CustomClient";

export default async (_: CustomClient, guild: Guild) => {
	try {
		if (scheduledJobs[guild.id]) scheduledJobs[guild.id].cancel();
		await DBHandler.settings.removeGuild(guild.id);
		return;
	} catch (e) {
		await handleE(e, "guildDelete() event");
		return;
	}
};
