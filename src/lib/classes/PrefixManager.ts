import { CachedManager } from "discord.js";

import type { Snowflake } from "discord.js";

import type { CustomClient } from "./CustomClient.js";

export class Prefix extends String {
  constructor(prefix: string) {
    super(prefix);
  }
}

export type PrefixResolvable = string | Prefix;

export class PrefixManager extends CachedManager<
  Snowflake,
  Prefix,
  PrefixResolvable
> {
  constructor(client: CustomClient) {
    super(client, Prefix);
  }
}
