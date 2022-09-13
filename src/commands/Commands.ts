// slash commands
import { slash_ping } from "./slash/slash_ping"
import { slash_poke } from "./slash/slash_poke"

// prefix commands
import { prefix_ping } from "./prefix/prefix_ping"
import { prefix_poke } from "./prefix/prefix_poke"


export const SlashCommands = [
	slash_ping, // ping command
	slash_poke, // poke command
]

export const PrefixCommands = [
	prefix_ping,
	prefix_poke,
]
