import { db } from "./lib/initDB";
import loadCommands from "./lib/handlers/commandsLoader";
import loadEvents from "./lib/handlers/eventsLoader";
import loadHelps from "./lib/handlers/helpLoader";

import { cleanupAll } from "./lib/utils";

import type { CustomClient } from "./lib/classes/CustomClient";

/**
 * Main Bot Class
 */
export class AyahBot {
  private client: CustomClient;
  private readonly token: string;

  constructor(client: CustomClient, token: string) {
    this.client = client;
    this.token = token;
  }

  public async listen(): Promise<string> {
    await loadEvents(this.client);
    await loadCommands(this.client);
    await loadHelps(this.client);

    return this.client.login(this.token);
  }

  public close(reason?: string): Promise<void> {
    console.log("Closing AyahBot." + (reason ? ` Reason: ${reason}` : ""));
    cleanupAll(db, this.client);
    return;
  }
}
