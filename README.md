# RonaBot v2
A bot that will show COVID-19 cases in Australia at the state level.
<br>
Settings are saved on MongoDB.
Database structure:
- Database: "settings"
    - Collection: "servers"
        - Documents: 
            - _id: 
            - name: string
            - server_id: string
            - vic: boolean
            - nsw: boolean
            - qld: boolean
            - act: boolean
            - sa: boolean
            - wa: boolean
            - nt: boolean
            - aus: boolean
            - constantly_update: boolean

### Config
You will need to create an .env file with the following values:
- DISCORD_TOKEN
- MONGO_URI
- SERVER_ID

### TODO:
- Allow the user to set whether the bot gives continuous updates
- Allow the user to set which states (or the whole country) they want continuous updates for
- Allow the user to get an update at will via a command
