import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

export async function slash_ping() {
	// name
	let name = 'ping'

	// builder
	let builder = new SlashCommandBuilder()
		.setName(name)
		.setDescription('Replies with Pong!')

	// execute func
	async function execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply("pong")
	}

	return { name, builder, execute }
}