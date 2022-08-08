import { Message } from "discord.js";

export async function prefix_ping() {
    let name = 'ping'
    
    async function execute(message: Message, ...args: string[]) {
        message.reply({
            content: "pong"
        })
    }

    return { name, execute }

}