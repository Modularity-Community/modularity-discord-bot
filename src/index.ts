import { Client } from "discord.js"
import { IntentOptions } from "./config/IntentOptions";

(async () => {
    const bot = new Client({
        intents: IntentOptions
    })

    bot.on("ready", () => {
        console.log("Bot Ready!")
    })

    await bot.login(process.env.BOT_TOKEN)
})();