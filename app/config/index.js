const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

module.exports = {
    serverID: process.env.SERVER_ID,
    databaseURL: process.env.MONGO_URI,
    dataSource: 'https://covidlive.com.au/',
    discord: {
        token: process.env.DISCORD_TOKEN
    }
}
