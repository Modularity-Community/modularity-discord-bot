import { Client, IntentsBitField } from "discord.js"
import { ValidateEnv } from "./utils/ValidateEnv"
import { SlashCommands, PrefixCommands } from "./commands/Commands";
import { prefix } from "./config/Config";
import dotenv from "dotenv";

dotenv.config();

(async () => {
    if (!ValidateEnv) return
    
    const client = new Client({
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.GuildBans,
            IntentsBitField.Flags.GuildEmojisAndStickers,
            IntentsBitField.Flags.GuildIntegrations,
            IntentsBitField.Flags.GuildInvites,
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.GuildMessageReactions,
            IntentsBitField.Flags.GuildMessageTyping,
            IntentsBitField.Flags.GuildPresences,
            IntentsBitField.Flags.GuildScheduledEvents,
            IntentsBitField.Flags.GuildVoiceStates,
            IntentsBitField.Flags.GuildWebhooks,
            IntentsBitField.Flags.MessageContent,
        ]
    })

    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }

        console.log(`${client.user.username} is online`);
    });

    client.on("interactionCreate", async interaction => {
        SlashCommands.map(async (item:any) => {
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
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift()!.toLowerCase();
        PrefixCommands.map(async (item:any) => {
            const { name, execute } = await item()
            if (name == command) {
                execute(message, args)
                return
            }
        })
    })

    await client.login(process.env.BOT_TOKEN)
})();