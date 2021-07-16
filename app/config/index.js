const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

module.exports = {
    databaseURL: process.env.MONGO_URI,
    availableLocations: ['vic', 'nsw', 'qld', 'act', 'ta', 'nt', 'sa'],
    sources: {
        vic: 'https://covidlive.com.au/vic',
        nsw: 'https://covidlive.com.au/nsw',
        qld: 'https://covidlive.com.au/qld',
        wa: 'https://covidlive.com.au/wa',
        sa: 'https://covidlive.com.au/sa',
        tas: 'https://covidlive.com.au/tas',
        nt: 'https://covidlive.com.au/nt',
        act: 'https://covidlive.com.au/act',
    },
    discord: {
        prefix: "/rbd",
        token: process.env.APP_ENV === 'staging' ? process.env.DISCORD_TOKEN_STAGING : process.env.DISCORD_TOKEN,
        icon: 'https://i.imgur.com/2ojyW5z.png'
    }
}
