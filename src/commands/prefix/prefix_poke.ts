import { Message } from "discord.js";

export async function prefix_poke() {
    let name = 'poke'
    
    async function execute(message: Message, ...args: string[]) {
        const mentions = message.mentions.users.map(value => value)
        message.channel.sendTyping()
        var out = `<@${message.author.id}> poked`
        mentions.map(value => {
            out += ` <@${value.id}>`
        })
        message.channel.send(out)
    }

    return { name, execute }

}