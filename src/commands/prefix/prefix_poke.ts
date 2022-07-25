import { Message } from "discord.js";
const Tenor = require("tenorjs").client({
    "Key": "3MYUQWVPOFEL",
    "Filter": "off", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
    "MediaFilter": "minimal", // either minimal or basic, not case sensitive
    "DateFormat": "D/MM/YYYY - H:mm:ss A"
});

export async function prefix_poke() {
    let name = 'poke'

    async function execute(message: Message, ...args: string[]) {
        const mentions = message.mentions.users.map(value => value)
        message.channel.sendTyping()
        var out = `<@${message.author.id}> poked`
        if (mentions.length == 0) {
            out += " themselves?!"
        }
        mentions.map(value => {
            out += ` <@${value.id}>`
        });

        const selected = await Tenor.Search.Query("poke anime", "25")
        await message.channel.send({
            content: out += `\n${selected[Math.floor(Math.random() * 25)].url}`,
        })
    }

    return { name, execute }

}