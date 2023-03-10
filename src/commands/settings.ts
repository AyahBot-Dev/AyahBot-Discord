import { SlashCommandBuilder } from "discord.js";

import { embed_error, create_embed } from "../lib/embeds/embeds";
import DBHandler from "../lib/DBHandler";
import { colors } from "../lib/embeds/infos";

import type { CommandInteraction } from "discord.js";

export default {
	name: "settings",
	description: "See current settings",
	category: "Settings",

	usage: "",

	guildOnly: true,
	cooldown: 5,

	slash: new SlashCommandBuilder()
		.setName("settings")
		.setDescription("See current settings")
		.setDMPermission(false),

	async execute(message: CommandInteraction) {
		// First: get the JSON object containing datas
		const data = await DBHandler.settings.fetch(message.guild.id);
		// Second: handling errors
		if (!data) {
			return await message.editReply({ embeds: [embed_error] });
		}
		// Third: prepare dTE
		let dTE = "";
		for (const key in data) {
			dTE += key + `: ${data[key]}\n`;
		}

		const embed = await create_embed("Settings: ", dTE, colors.info);
		return await message.editReply({ embeds: [embed] });
	},
};
