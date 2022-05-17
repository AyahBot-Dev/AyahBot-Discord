import "reflect-metadata";
import { Intents } from "discord.js";
import { Container } from "inversify";
import { TYPES } from "./src/types.js";
import { Bot } from "./src/Bot.js";
import { CustomClient } from "./src/lib/classes/CustomClient.js";

const container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<CustomClient>(TYPES.Client).toConstantValue(
  new CustomClient({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_TYPING,
      Intents.FLAGS.DIRECT_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
  })
);
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);

export default container;
