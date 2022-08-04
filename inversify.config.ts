import "reflect-metadata";
import { GatewayIntentBits, Partials } from "discord.js";
import { Container } from "inversify";
import { TYPES } from "./src/types";
import { Bot } from "./src/Bot";
import { CustomClient } from "./src/lib/classes/CustomClient";

const container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<CustomClient>(TYPES.Client).toConstantValue(
  new CustomClient({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageTyping,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.DirectMessageTyping,
      GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  })
);
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);

export default container;
