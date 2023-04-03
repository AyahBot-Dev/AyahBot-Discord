import { invalid_datatype, create_embed } from "../lib/embeds/embeds";
import { initJPS } from "../lib/utils";
import { colors } from "../lib/embeds/infos";

import type {
	CacheType,
	CommandInteraction,
	CommandInteractionOption,
} from "discord.js";

import type { CustomClient } from "../lib/classes/CustomClient";

export default {
	name: "reload",
	description: "Reload AyahBot",

	usage: "<options>",

	ownerOnly: true,
	cooldown: 3,

	async execute(
		message: CommandInteraction,
		args: readonly CommandInteractionOption<CacheType>[],
		client: CustomClient
	) {
		// reload
		// for that first check args - done

		const option: string = args[0]?.value as string;
		const options = ["jobs", "quranTrs", "slashes"];

		// now begin all of'em

		// first see if option exists in reloadable things
		if (option && !options.includes(option))
			return await message.editReply({
				embeds: [await invalid_datatype(option, "a valid reloadable item")],
			});

		if (option)
			return await (
				await import(`../lib/handlers/${option}Loader`)
			)
				.default(client)
				// deepcode ignore PromiseNotCaughtGeneral: <Handled in handler>
				.then(
					async () =>
						await message.editReply({
							embeds: [
								await create_embed(
									"Successfully reloaded",
									`Successfully reloaded all ${option}`,
									colors.success
								),
							],
						})
				);

		// else reload all
		// FIXME: clear cache - not able in esm import
		await initJPS(client);

		return await message.editReply({
			embeds: [
				await create_embed(
					"Successfully reloaded",
					`Successfully reloaded everything`,
					colors.success
				),
			],
		});
	},
};
