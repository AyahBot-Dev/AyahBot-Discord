import container from "./inversify.config";
import { TYPES } from "./src/types";

import type { Bot } from "./src/Bot";

const bot = container.get<Bot>(TYPES.Bot);

bot
  .listen()
  .then(() => {
    console.log("Logged in!");
  })
  .catch((error) => {
    console.log("Oh no! ", error);
  });
