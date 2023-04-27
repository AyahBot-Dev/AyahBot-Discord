import { handleE } from "../utils";
import { colors } from "../embeds/infos";

import { EmbedBuilder, EmbedData } from "discord.js";

import type { CustomClient } from "../classes/CustomClient";

export default async (client: CustomClient) => {
	try {
		console.time("Time taken");
		const categories = [];
		const links = [
			[
				"Invite me",
				"https://discord.com/oauth2/authorize?client_id=864837051144863754&permissions=34359830592&scope=bot%20applications.commands",
			],
			["Support server", "https://discord.gg/5EvTMeQQgA"],
			["Github", "https://www.github.com/AyahBot-Dev/AyahBot-Discord"],
		];

		client.commands.forEach((v) =>
			v.category && !categories.includes(v.category)
				? categories.push(v.category)
				: null
		);

		categories.forEach((v) => {
			const commands = [];
			client.commands.forEach((w) => {
				if (w.category && w.category == v) commands.push(w);
			});
			const embed = {
				color: colors.info,
				title: v,
				description: `Informations on the category \`${v}\``,
				fields: [],
			} as EmbedData;
			commands.forEach((x) =>
				embed.fields.push({
					inline: true,
					name: x.name,
					value: `${x.description}\n\n**Usage:**\n\`${x.name} ${x.usage}\``,
				})
			);
			client.helpCommands.set(v, new EmbedBuilder(embed));
		});

		const embed = {
			color: colors.success,
			title: "AyahBot Help Menu",
			description:
				"To view more details of a specific command, write `/help <category>`",
			fields: [
				{
					name: "Categories:",
					value: `» ${categories.join("\n» ")}`,
				},
				{
					name: "Links:",
					value: "",
				},
			],
		} as EmbedData;

		links.forEach((v) => (embed.fields[1].value += `• [${v[0]}](${v[1]})\n`));

		client.helpCommands.set("main", new EmbedBuilder(embed));

		console.log("Successfully generated help commands");
		console.timeEnd("Time taken");
	} catch (e) {
		await handleE(e, "helpLoader.ts");
		console.error("Couldn't generate help commands!: \n", e);
	}
};
