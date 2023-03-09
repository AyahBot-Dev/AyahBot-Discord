import { SlashCommandBuilder } from "discord.js";

import { invalid_datatype } from "../lib/embeds/embeds";

import type {
	CacheType,
	CommandInteraction,
	CommandInteractionOption,
} from "discord.js";

import type { CustomClient } from "../lib/classes/CustomClient";

export default {
	name: "help",
	description: "Show AyahBot help page",

	usage: "<options>",

	cooldown: 3,

	slash: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Show AyahBot help page")
		.addStringOption((option) =>
			option
				.setName("options")
				.setDescription("Enter the category you are wanting to know")
				.setChoices(
					{ name: "Quran", value: "Quran" },
					{ name: "Settings", value: "Settings" },
					{ name: "Random-utils", value: "Random-utils" }
				)
		),

	async execute(
		message: CommandInteraction,
		args: readonly CommandInteractionOption<CacheType>[],
		client: CustomClient
	) {
		const option = args[0]?.value as string;

		// now begin all of'em

		if (
			option &&
			!client.helpCommands.has(
				option[0].toUpperCase() + option.slice(1).toLowerCase()
			)
		)
			return await message.editReply({
				embeds: [
					await invalid_datatype(option, "a valid category from the list"),
				],
			});

		if (option)
			return await message.editReply({
				embeds: [
					await client.helpCommands.get(
						option[0].toUpperCase() + option.slice(1).toLowerCase()
					),
				],
			});

		return await message.editReply({
			embeds: [await client.helpCommands.get("main")],
		});
	},
};
