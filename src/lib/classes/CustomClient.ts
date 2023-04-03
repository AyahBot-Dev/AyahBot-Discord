import {
	Client,
	Collection,
	CommandInteraction,
	EmbedBuilder,
	PermissionResolvable,
	SlashCommandBuilder,
} from "discord.js";

import { QuranTrsManager } from "./QuranTrsManager";

import type {
	ClientOptions,
	CommandInteractionOption,
	CacheType,
} from "discord.js";

export interface Command {
	name: string;
	description: string;
	category: string;
	usage: string;
	ownerOnly: boolean;
	guildOnly: boolean;
	cooldown: number;
	permissions: PermissionResolvable;
	slash: SlashCommandBuilder;
	execute: (
		a: CommandInteraction,
		b: readonly CommandInteractionOption<CacheType>[],
		c: CustomClient
	) => void;
}

export class CustomClient extends Client {
	public commands: Collection<string, Command>;
	public cooldowns: Collection<string, Collection<number, number>>;
	public helpCommands: Collection<string, EmbedBuilder>;
	public quranTrs: QuranTrsManager;

	constructor(clientOptions: ClientOptions) {
		super(clientOptions);
		this.commands = new Collection();
		this.cooldowns = new Collection();
		this.helpCommands = new Collection();
		this.quranTrs = new QuranTrsManager(this);
	}
}
