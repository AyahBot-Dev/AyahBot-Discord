import { inject, injectable } from "inversify";

import { db } from "./lib/initDB";
import loadCommands from "./lib/handlers/commandsLoader";
import loadEvents from "./lib/handlers/eventsLoader";
import loadHelps from "./lib/handlers/helpLoader";
import { TYPES } from "./types";

import type { CustomClient } from "./lib/classes/CustomClient";

@injectable()
export class Bot {
  private client: CustomClient;
  private readonly token: string;

  constructor(
    @inject(TYPES.Client) client: CustomClient,
    @inject(TYPES.Token) token: string
  ) {
    this.client = client;
    this.token = token;
  }

  public async listen(): Promise<string> {
    // initialize
    await loadEvents(this.client);
    await loadCommands(this.client);
    await loadHelps(this.client);

    return this.client.login(this.token);
  }

  public close(): Promise<void> {
    db.goOffline();
    this.client.destroy();
    process.exit(0);
  }
}
