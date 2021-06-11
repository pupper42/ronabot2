# ***THIS IS STILL UNDER DEVELOPMENT***

# RonaBot v2
A bot that will show COVID-19 cases in Australia at the state level.
Invite: https://discord.com/api/oauth2/authorize?client_id=844123673257443338&permissions=8&scope=bot
<br>

Settings are saved on MongoDB.
Database structure:
- Database: "settings"
    - Collection: "servers"
        - Documents: 
            - _id: 
            - name: string
            - server_id: string
            - location: array
            - updateData: object
            - constantly_update: boolean
            - update_interval: number
            - updated_at: date

### Config
You will need to create an .env file with the following values:
- DISCORD_TOKEN
- MONGO_URI

### Commands
Prefix: /ronabot
- **ping** - this is just a test
- **on** - enables the alerts
- **off** - disables the alerts
- **setinterval [location] [time in minutes]** - set how often you want to receive alerts (set to 0 to turn off)
- **add [location]** - add a location to your server
- **remove [location]** - remove a location from your server
- **get [location]** - get the statistics of the location
- **list** - list the locations added

### TODO:
- Scraper service
- Allow the user to get an update at will via a command
