import { EmbedBuilder } from "discord.js";

import { colors } from "./infos";

/* istanbul ignore next */
export const create_embed = (
	title: string,
	description: string,
	color: number = undefined
) => {
	// Overall: return a resolved promise containing embed
	return new Promise((resolve) => {
		resolve(
			new EmbedBuilder()
				.setTitle(title)
				.setDescription(description)
				.setColor(color)
		);
	});
};

/* istanbul ignore next */
export const embed_error = new EmbedBuilder({
	color: colors.error,
	title: "An error occured",
	description:
		"I faced some error while processing your request. Please try again later.",
});

/* istanbul ignore next */
export const syntax_error = (...args: string[]) => {
	return new Promise((resolve) => {
		resolve(
			new EmbedBuilder()
				.setTitle("Invalid Arguments")
				.setDescription(
					`You've written invaild argument(s). \nMaintain this argument type and order for this command: \`\`\`\n${args.join(
						" "
					)}\n\`\`\``
				)
				.setColor(16757248)
		);
	});
};

/* istanbul ignore next */
export const invalid_datatype = (data: string, schema: string) => {
	return new Promise((resolve) => {
		resolve(
			new EmbedBuilder()
				.setTitle("Invalid datatype for argument")
				.setDescription(
					`The argument \`${data}\` you gave me is not valid. \nThe argument should be ${schema}.`
				)
				.setColor(16757248)
		);
	});
};

/* istanbul ignore next */
export const insufficient_perms = (cmd: string, perms: string[]) => {
	return new Promise((resolve) => {
		resolve(
			new EmbedBuilder()
				.setTitle("Insufficient permissions to run this command")
				.setDescription(
					`To run \`${cmd}\` command, you need to have the following permission(s):\n${perms.join(
						", "
					)}`
				)
				.setColor(16757248)
		);
	});
};

/* istanbul ignore next */
export const coolDownsEmbed = new EmbedBuilder()
	.setTitle("Cooldown alert!")
	.setDescription(
		"You need to wait for sometimes before using this command again"
	)
	.setColor(16757248);

/* istanbul ignore next */
/* export const generateHelpEmbed = async (categories) => {
	 let markers = ["»", "•"]; // Credits: IslamBot
	const links = new Map([
		["Support server", "https://discord.gg/TMv5dAE5cx"],
		["Github", "https://github.com/Kamrulhasan12345/AyahBot"],
	]);
	const embed = {
		color: 5478908,
		title: "AyahBot Help Menu",
		description: `To view more details of a specific command, write \`/help <command>\``,
		fields: [
			{
				name: "Categories: ",
				value: "",
			},
			{
				name: "Links",
				value: "",
			},
		],
	};

	categories.forEach((_, k) => {
		embed.fields[0].value += `» ${k}\n`;
	});
	links.forEach((v, k) => {
		embed.fields[1].value += `• [${k}](${v})\n`;
	});
	return embed;
};
*/
