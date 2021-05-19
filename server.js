const config = require('./app/config');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// TODO: Clean these up
const Discord = require('discord.js');
// const cheerio = require('cheerio');
// const dataSource = config.dataSource;
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
            console.error('Connection error:', config.databaseURL);
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

        // Load the Discord listener
        client.commands = new Discord.Collection();

        const commandFiles = fs.readdirSync(path.resolve(__dirname, './app/commands')).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(path.resolve(__dirname, `./app/commands/${file}`));
            // set a new item in the Collection
            // with the key as the command name and the value as the exported module
            client.commands.set(command.name, command);
        }

        // Listen to Discord messages
        client.on('message', message => {
            console.log(message.content);

            if (!message.content.startsWith(config.discord.prefix) || message.author.bot) return;

            const args = message.content.slice(config.discord.prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();

            if (!client.commands.has(command)) {
                message.reply('Please give me a command!');
                return;
            }

            try {
                client.commands.get(command).execute(message, args);
            } catch (error) {
                console.error(error);
                message.reply('There was an error trying to execute that command!');
            }
        });

        client.login(config.discord.token);
    }
}

// Run the bot
new RonaBot();
