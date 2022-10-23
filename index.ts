import { GatewayIntentBits, Partials } from "discord.js";

import { AyahBot } from "./src/Bot";
import { CustomClient } from "./src/lib/classes/CustomClient";

// const bot = container.get<Bot>(TYPES.Bot);

const bot = new AyahBot(
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
  }),
  process.env.TOKEN
);

bot
  .listen()
  .then(() => {
    console.log("Logged in!");
  })
  .catch((error) => {
    console.log("Oh no! ", error);
  });

process.once("SIGINT", () => bot.close("SIGINT"));
process.once("SIGTERM", () => bot.close("SIGTERM"));
