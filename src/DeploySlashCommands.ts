import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v9"
import { SlashCommands } from "./commands/Commands";
import dotenv from "dotenv";

dotenv.config();

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN!);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		let d = SlashCommands.map(async(item) => {
			return (await item()).builder.toJSON()
		})

		Promise.all(d).then(async(value) => {
			await rest.put(
				Routes.applicationGuildCommands(process.env.ClientID!, process.env.GuildID!),
				{ body: value },
			);
		})

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();