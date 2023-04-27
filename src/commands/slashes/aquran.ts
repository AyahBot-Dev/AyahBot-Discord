/* eslint-disable @typescript-eslint/no-explicit-any */
import { SlashCommandBuilder } from "discord.js";

import { Ayah, sanitizeVerse } from "../../lib/classes/Ayah";
import { syntax_error, invalid_datatype } from "../../lib/embeds/embeds";
import { convertToEmbed } from "../../lib/utils";

import type {
	CacheType,
	CommandInteraction,
	CommandInteractionOption,
} from "discord.js";

export default {
	name: "aquran",
	description: "Show an arabic ayah from quran using verse key",
	category: "Quran",

	usage: "<verse_key>",

	cooldown: 2,

	slash: new SlashCommandBuilder()
		.setName("aquran")
		.setDescription("Show an arabic ayah from quran using verse key")
		.addStringOption((option) =>
			option
				.setName("verse_key")
				.setDescription(
					"Enter a verse key (a surah:ayah pair, e.g. '3:157', '3:100-105')"
				)
				.setRequired(true)
		),

	async execute(
		interaction: CommandInteraction,
		args: readonly CommandInteractionOption<CacheType>[]
	) {
		if (!args[0])
			return await interaction.editReply({
				embeds: [await syntax_error("<verse_key (e.g. 3:157 or 3:100-105)>")],
			});

		const verse_key: string = args[0]?.value as string;

		const [surah, verse] = verse_key.split(":");
		const isNotValid = verse
			? await sanitizeVerse((surah as any) - 1, verse)
			: true;

		if (isNotValid)
			return await interaction.editReply({
				embeds: [await invalid_datatype(verse_key, "a valid verse key")],
			});

		return interaction.editReply({
			embeds: [
				await convertToEmbed(
					await Ayah.fetch(`${surah}:${verse}`, undefined, "ar")
				),
			],
		});
	},
};
