import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v9"
import { Commands } from "./commands/Commands";
import { RESTPostAPIApplicationCommandsJSONBody, SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN!);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		let c:RESTPostAPIApplicationCommandsJSONBody[] = []
		Commands.map(async(item, i, {length}) => {
			c.push((await item()).builder.toJSON())
			if (length - 1 === i) {
				await rest.put(
					Routes.applicationGuildCommands(process.env.ClientID!, process.env.GuildID!),
					{ body: c },
				);
				console.log(c)
			}
		})
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();