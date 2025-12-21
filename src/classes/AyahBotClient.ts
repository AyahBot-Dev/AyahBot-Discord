import { Client, Collection, type ClientOptions } from "discord.js";

export default class AyahBotClient<
  Ready extends boolean = boolean,
> extends Client<Ready> {
  commands: Collection<string, any>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
  }
}
