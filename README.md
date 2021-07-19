# RonaBot v2
### About
A bot that will show COVID-19 cases in Australia at the state level. Settings are saved on MongoDB.
Invite: https://discord.com/api/oauth2/authorize?client_id=844123673257443338&permissions=0&scope=bot

### Hosting it yourself
You will need to create a .env file with the following values:
- DISCORD_TOKEN
- MONGO_URI

You will need to set up a MongoDB server somewhere and retrieve its URL and place it into the .env file.

### Commands
Prefix: /rb
- **add [location]** - Add a location to provide automatic updates for. Current available locations are: vic, nsw, qld, wa, sa, tas, nt, act
- **remove [location]** - Remove a location to provide automatic updates for
- **get [location]** - Return a single location's statistics
- **init [repeating/scheduled] [time]** - Use the current channel for automatic updates. Still need to do /rb on to enable automatic updates
- **toggle [on/off]** - Turn on/off auto updates for the server
- **status** - Get the current bot status and settingds
- **help** - Show the commands the bot will accept

### Future updates:
- Social media updates maybe?
- Add other countries?
