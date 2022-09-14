import random as random
import requests
import json
from discord.ext import commands

class Gif(commands.Cog):
    def __init__(self, client):
        self.client = client

    # Events
    @commands.Cog.listener()
    async def on_ready(self):
        print(f'Cog \'{(type(self).__name__).lower()}\' is ready.')

    # Command gif
    @commands.command()
    async def gif(self, context, *args):
        resultGif = await search_gifs(" ".join(args))
        await context.message.channel.send(resultGif)

    # Command punch
    @commands.command()
    async def punch(self, context, *args):
        mentions = context.message.mentions
        msg = ""
        if not mentions:
            msg += f'{context.message.author.mention} is punching themselves..?'
        else:
            msg += f'{context.message.author.mention} punched '
            for mention in mentions:
                msg += f'{mention.mention} '
        gif = await search_gifs('punch')
        await context.message.channel.send(content=f'{msg}\n{gif}')


# gif (tenor)
async def search_gifs(query):
    apikey = "3MYUQWVPOFEL"
    lmt = 10
    search_term = query
    gifs = []
    r = requests.get(
        "https://api.tenor.com/v1/search?q=%s&key=%s&limit=%s" % (search_term, apikey, lmt))
    if r.status_code == 200:
        # load the GIFs using the urls for the smaller GIF sizes
        top = json.loads(r.content)
        for res in top["results"]:
            gifs.append(res["url"])
        gif = random.choice(gifs)
        return gif
    else:
        top_8gifs = None

async def setup(client):
    await client.add_cog(Gif(client))