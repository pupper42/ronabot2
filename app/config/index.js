const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

module.exports = {
    databaseURL: process.env.MONGO_URI,
    vicSource: 'https://covidlive.com.au/vic',
    nswSource: 'https://covidlive.com.au/nsw',
    qldSource: 'https://covidlive.com.au/qld',
    waSource: 'https://covidlive.com.au/wa',
    saSource: 'https://covidlive.com.au/sa',
    tasSource: 'https://covidlive.com.au/tas',
    ntSource: 'https://covidlive.com.au/nt',
    actSource: 'https://covidlive.com.au/act',
    discord: {
        prefix: "/rbd",
        token: process.env.DISCORD_TOKEN,
        icon: 'https://i.imgur.com/2ojyW5z.png'
    }
}
