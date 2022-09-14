from discord.ext import commands

class Basic(commands.Cog):
    def __init__(self, client):
        self.client = client

    # Events
    @commands.Cog.listener()
    async def on_ready(self):
        print(f'Cog \'{(type(self).__name__).lower()}\' is ready.')

    # Command Ping
    @commands.command()
    async def ping(self, context):
        await context.reply("Pong!")

async def setup(client):
    await client.add_cog(Basic(client))