# RonaBot v2
A bot that will show COVID-19 cases in Australia at the state level. Settings are saved on MongoDB.
Invite: https://discord.com/api/oauth2/authorize?client_id=844123673257443338&permissions=0&scope=bot
<br>
<br>

### Hosting it yourself
You will need to create a .env file with the following values:
- DISCORD_TOKEN
- MONGO_URI

### Commands
Prefix: /rb
- **settings** - Show the current settings for the server
- **add [location]** - Add a location to provide automatic updates for. Current available locations are: vic, nsw, qld, wa, sa, tas, nt, act
- **remove [location]** - Remove a location to provide automatic updates for
- **get [location]** - Return a single location's statistics
- **init** - Use the current channel for automatic updates. Still need to do /rb on to enable automatic updates
- **on** - Turn on auto updates for the server
- **off** - Turn off auto updates for the server
- **setinterval [time in minutes]** - Set the how often the bot should check for updates (in minutes) if auto updates are on. If an update is found it will send it to the initialised channel.
- **ping** - Get the current latency between the bot and the Discord server
- **addserver** - If the bot doesn't detect your server, then use this command. WARNING: WILL REVERT ALL SETTINGS TO DEFAULT!!!
- **help** - Show the commands the bot will accept

### TODO:
- Social media updates maybe?
- Add other countries?
- Permissions
- Set what time to start the auto update "cycle"
