import asyncio
import os
import discord
from discord.ext import commands
from dotenv import load_dotenv

load_dotenv()

intents = discord.Intents.all()
client = commands.Bot(command_prefix='~', intents=intents)

# onready event
@client.event
async def on_ready():
    print(f"Logged in as {client.user.name}({client.user.id})")

# load
@client.command()
@commands.has_role(984490921754259478)
async def load(context, extension):
    ext = extension.lower()
    await client.load_extension(f'cogs.{ext}')
    await context.reply("Cog "+ ext + " loaded.")
    await print(f"Cog '{ext}' loaded.")

# unload
@client.command()
@commands.has_role(984490921754259478)
async def unload(context, extension):
    ext = extension.lower()
    await client.unload_extension(f'cogs.{ext}')
    await context.reply("Cog "+ ext + " unloaded.")
    await print(f"Cog '{ext}' unloaded.")

# reload
@client.command()
@commands.has_role(984490921754259478)
async def reload(context, extension):
    ext = extension.lower()
    await client.unload_extension(f'cogs.{ext}')
    await client.load_extension(f'cogs.{ext}')
    await context.reply("Cog "+ ext + " reloaded.")
    await print(f"Cog '{ext}' reloaded.")

# load extensions
async def load_extensions():
    for filename in os.listdir("./cogs"):
        if filename.endswith(".py") and filename != "__init__.py":
            await client.load_extension(f'cogs.{filename[:-3]}')

# main function
async def main():
    async with client:
        await load_extensions()
        await client.start(os.getenv('BOT_TOKEN'))

asyncio.run(main())