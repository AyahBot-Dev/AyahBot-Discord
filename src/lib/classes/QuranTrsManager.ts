import { CachedManager } from "discord.js";

import type { Collection, Snowflake } from "discord.js";
import type { CustomClient } from "./CustomClient";

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
  private _cache: Collection<number, number>;

  constructor(client: CustomClient) {
    super(client, QuranTrs);
  }
}
