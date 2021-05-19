const config = require('./app/config');
const MongoFunctions = require('./MongoFunctions');
const Discord = require('discord.js');
const cheerio = require('cheerio');
const dataSource = 'https://covidlive.com.au/';
const client = new Discord.Client();
const defaultSettings = {
    vic: false,
    nsw: false,
    qld: false,
    act: false,
    sa: false,
    wa: false,
    nt: false,
    constantly_update: false
}

class RonaBot {

    /**
     * Constructor - load the bot!
     */
    constructor() {
        this.initCrudService();

        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}`);
            client.guilds.cache.forEach(guild => {
                console.log(`${guild.name} | ${guild.id}`);
            });
        });

        client.login(config.discord.token);
    }

    /**
     * Initialise the CRUD service
     */
    initCrudService() {
        const mfx = new MongoFunctions();
        mfx.crudService("r").catch(console.error);
        mfx.crudService("u", config.serverID, {vic: false});
    }
}

// Run the bot
new RonaBot();
