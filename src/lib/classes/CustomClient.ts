import {
  Client,
  Collection,
  CommandInteraction,
  MessageEmbed,
} from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

import { PrefixManager } from "./PrefixManager";
import { QuranTrsManager } from "./QuranTrsManager";

import type {
  ClientOptions,
  Message,
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
  permissions: string[];
  slash: SlashCommandBuilder;
  execute: (
    a: Message | CommandInteraction,
    b: string[] | readonly CommandInteractionOption<CacheType>[],
    c: CustomClient
  ) => void;
}

export class CustomClient extends Client {
  public commands: Collection<string, Command>;
  public cooldowns: Collection<string, Collection<number, number>>;
  public helpCommands: Collection<string, MessageEmbed>;
  public prefixes: PrefixManager;
  public quranTrs: QuranTrsManager;

  constructor(clientOptions: ClientOptions) {
    super(clientOptions);
    this.commands = new Collection();
    this.cooldowns = new Collection();
    this.helpCommands = new Collection();
    this.prefixes = new PrefixManager(this);
    this.quranTrs = new QuranTrsManager(this);
  }
}
