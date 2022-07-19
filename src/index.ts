import { Client } from "discord.js"
import { IntentOptions } from "./config/IntentOptions";
import { validateEnv } from "./utils/validateEnv";

(async () => {
    if (!validateEnv()) return
    
    const bot = new Client({
        intents: IntentOptions
    })

    bot.on("ready", () => {
        console.log("Bot Ready!")
    })

    await bot.login(process.env.BOT_TOKEN)
})();