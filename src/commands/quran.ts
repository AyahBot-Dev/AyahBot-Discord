/* eslint-disable @typescript-eslint/no-explicit-any */
import { SlashCommandBuilder } from "discord.js";

import { Ayah, sanitizeVerse, translations } from "../lib/classes/Ayah";
import { syntax_error, invalid_datatype } from "../lib/embeds/embeds";
import { convertToEmbed } from "../lib/utils";

import type {
	CacheType,
	CommandInteraction,
	CommandInteractionOption,
} from "discord.js";

import type { CustomClient } from "../lib/classes/CustomClient";

export default {
	name: "quran",
	description: "Show an ayah from quran using verse key (with arabic)",
	category: "Quran",

	usage: "<verse_key> <translation_key>",

	cooldown: 2,

	slash: new SlashCommandBuilder()
		.setName("quran")
		.setDescription("Show an ayah from quran using verse key (with arabic)")
		.addStringOption((option) =>
			option
				.setName("verse_key")
				.setDescription(
					"Enter a verse key (a surah:ayah pair, e.g. '3:157', '3:100-105')"
				)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("translation")
				.setDescription(
					"Enter a translation code (e.g. 'hilali') from our translations wiki"
				)

				.setRequired(false)
		),

	async execute(
		message: CommandInteraction,
		args: readonly CommandInteractionOption<CacheType>[],
		client: CustomClient
	) {
		if (!args[0])
			return await message.editReply({
				embeds: [await syntax_error("<verse_key (e.g. 3:157 or 3:100-105)>")],
			});

		let translation: number | string = args[1]?.value as string;
		const verse_key = args[0]?.value as string;

		if (translation && !translations[translation])
			return await message.editReply({
				embeds: [
					await invalid_datatype(
						translation as string,
						"a valid translation code listed [here](https://github.com/AyahBot-Dev/AyahBot-Discord/wiki/Translations)"
					),
				],
			});

		if (!translation)
			translation =
				(await (client.quranTrs.cache.get(message.guildId) as number)) ||
				undefined;

		const [surah, verse] = verse_key.split(":");
		const isNotValid = verse
			? await sanitizeVerse((surah as any) - 1, verse)
			: true;

		if (isNotValid)
			return await message.editReply({
				embeds: [await invalid_datatype(verse_key, "a valid verse key")],
			});

		return message.editReply({
			embeds: [
				await convertToEmbed(
					await Ayah.fetch(`${surah}:${verse}`, translation, "mixed")
				),
			],
		});
	},
};
