import { CachedManager } from "discord.js";

import type { Collection, Snowflake } from "discord.js";
import type { CustomClient } from "./CustomClient";

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
  private _cache: Collection<number, string>;

  constructor(client: CustomClient) {
    super(client, Prefix);
  }
}
