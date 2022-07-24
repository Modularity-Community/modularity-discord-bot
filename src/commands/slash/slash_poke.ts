import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

export async function slash_poke() {
	// name
	let name = 'poke'

	// builder
	let builder = new SlashCommandBuilder()
		.setName(name)
		.setDescription('Poke someone!')
        .addMentionableOption(option => 
            option
                .setName("target")
                .setDescription("user to poke")
        )

	// execute func
	async function execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getMentionable("target")
        await interaction.reply(`<@!${interaction.user.id}> poked ${target}`)
	}

	return { name, builder, execute }
}