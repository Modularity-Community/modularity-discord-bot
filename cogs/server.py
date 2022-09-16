from discord.ext import commands

class Server(commands.Cog):
    def __init__(self, client):
        self.client = client

    # Events
    @commands.Cog.listener()
    async def on_ready(self):
        print(f'Cog \'{(type(self).__name__).lower()}\' is ready.')

    # on user join
    @commands.Cog.listener()
    async def on_member_join(self, member):
        id = 984498326768590919
        role = member.guild.get_role(id)
        try:
            await member.add_roles(role)
        except Exception as e:
            print(e)


async def setup(client):
    await client.add_cog(Server(client))