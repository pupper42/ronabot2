const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

module.exports = {
    databaseURL: process.env.MONGO_URI,
    availableLocations: ['vic', 'nsw', 'qld', 'wa', 'act', 'tas', 'nt', 'sa'],
    sources: {
        vic: 'https://covidlive.com.au/vic',
        nsw: 'https://covidlive.com.au/nsw',
        qld: 'https://covidlive.com.au/qld',
        wa: 'https://covidlive.com.au/wa',
        sa: 'https://covidlive.com.au/sa',
        tas: 'https://covidlive.com.au/tas',
        nt: 'https://covidlive.com.au/nt',
        act: 'https://covidlive.com.au/act'
    },
    globalSources: {
        cases: 'https://covidlive.com.au/world/cases',
        vaccinations: 'https://covidlive.com.au/world/vaccinations'
    },
    discord: {
        token: process.env.DISCORD_TOKEN,
        client_id: '844123673257443338',
        icon: 'https://i.imgur.com/2ojyW5z.png'
    }
}
