import { Client, IntentsBitField } from "discord.js"
import { ValidateEnv } from "./utils/ValidateEnv"
import { Commands } from "./commands/Commands";
import dotenv from "dotenv";

dotenv.config();

(async () => {
    if (!ValidateEnv) return
    
    const client = new Client({
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent
        ]
    })

    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }

        console.log(`${client.user.username} is online`);
    });

    client.on("interactionCreate", async interaction => {
        Commands.map(async (item:any) => {
            const {name, execute} = await item()
            if (interaction.isChatInputCommand()
                || interaction.isContextMenuCommand()
                || interaction.isMessageContextMenuCommand()
                || interaction.isUserContextMenuCommand()
            ) {
                if (interaction.commandName == name) {
                    execute(interaction)
                    return
                }
            }
        })
    })

    client.on("messageCreate", async (message) => {
        console.log(message)
    })

    await client.login(process.env.BOT_TOKEN)
})();