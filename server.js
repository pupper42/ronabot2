const config = require('./app/config');
const mongoose = require('mongoose');

// TODO: Clean these up
const Discord = require('discord.js');
const cheerio = require('cheerio');
const dataSource = config.dataSource;
const client = new Discord.Client();

class RonaBot {

    /**
     * Constructor - load the bot!
     */
    constructor() {
        this.initDatabaseConnection();
        this.initDiscord();
    }

    /**
     * Initialise the Database connection
     */
    initDatabaseConnection() {
        // Test Database Connection
        mongoose.connect(config.databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = mongoose.connection;

        db.once('open', _ => {
            console.log('Database connected:', config.databaseURL);
        });

        db.on('error', err => {
            console.error('connection error:', config.databaseURL);
            process.exit(1);
        });
    }

    /**
     * Initialise the Discord
     */
    initDiscord() {
        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}`);
            client.guilds.cache.forEach(guild => {
                console.log(`${guild.name} | ${guild.id}`);
            });
        });

        client.login(config.discord.token);
    }

    /**
     * Initialise the BotCommand service
     */
    // initBotCommandService() {
    //     const mfx = new MongoFunctions();
    //     mfx.crudService("r").catch(console.error);
    //     mfx.crudService("u", config.serverID, {vic: false});
    // }
}

// Run the bot
new RonaBot();
