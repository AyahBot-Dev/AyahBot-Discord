import { SlashCommandBuilder } from "discord.js";

import { Ayah } from "../lib/classes/Ayah";
import { convertToEmbed } from "../lib/utils";

import type { CommandInteraction, Message } from "discord.js";

export default {
	name: "raquran",
	description: "Show a random arabic ayah",
	category: "Random-utils",

	usage: "",

	cooldown: 3,

	slash: new SlashCommandBuilder()
		.setName("raquran")
		.setDescription("Show a random arabic ayah"),

	async execute(message: CommandInteraction) {
		return await message.editReply({
			embeds: [await convertToEmbed(await Ayah.random(undefined, false, "ar"))],
		});
	},
};
