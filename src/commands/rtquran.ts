import { SlashCommandBuilder } from "discord.js";

import { Ayah, translations } from "../lib/classes/Ayah";
import { invalid_datatype } from "../lib/embeds/embeds";
import { convertToEmbed } from "../lib/utils";

import type {
	CacheType,
	CommandInteraction,
	CommandInteractionOption,
} from "discord.js";

import type { CustomClient } from "../lib/classes/CustomClient";

export default {
	name: "rtquran",
	description: "Show a random ayah (without arabic)",
	category: "Random-utils",

	usage: "<translation_key>",

	cooldown: 3,

	slash: new SlashCommandBuilder()
		.setName("rtquran")
		.setDescription("Show a random ayah (without arabic)")
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
		let translation: string | number = args[0]?.value as string;

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
			translation = (await client.quranTrs.cache.get(
				message.guildId
			)) as number;

		return await message.editReply({
			embeds: [
				await convertToEmbed(await Ayah.random(translation, false, "en")),
			],
		});
	},
};
