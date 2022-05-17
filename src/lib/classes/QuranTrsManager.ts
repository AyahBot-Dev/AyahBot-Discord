import { CachedManager } from "discord.js";

import type { Snowflake } from "discord.js";

import type { CustomClient } from "./CustomClient.js";

export class QuranTrs extends Number {
  constructor(quran: number) {
    super(quran);
  }
}

export type QuranTrsResolvable = number | QuranTrs;

export class QuranTrsManager extends CachedManager<
  Snowflake,
  QuranTrs,
  QuranTrsResolvable
> {
  constructor(client: CustomClient) {
    super(client, QuranTrs);
  }
}
