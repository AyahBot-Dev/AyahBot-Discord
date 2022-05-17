import container from "./inversify.config.js";
import { TYPES } from "./src/types.js";

import type { Bot } from "./src/Bot.js";

const bot = container.get<Bot>(TYPES.Bot);

bot
  .listen()
  .then(() => {
    console.log("Logged in!");
  })
  .catch((error) => {
    console.log("Oh no! ", error);
  });
