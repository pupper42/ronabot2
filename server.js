/**
 * Welcome to RonaBot v2!
 */

const config = require('./app/config');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const client = new Discord.Client();
const Agenda = require('agenda');

class RonaBot {

    /**
     * Constructor - load the bot!
     */
    constructor() {
        this.initDatabaseConnection();
        this.initDiscord();
        this.initTaskRunner();
    }

    /**
     * Initialise the Database connection
     */
    initDatabaseConnection() {
        // Test Database Connection
        mongoose.connect(config.databaseURL, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });
        const db = mongoose.connection;

        // Check database connection
        db.once('open', _ => {
            console.log('Database connected:', config.databaseURL);
        });

        // If database is down, exit the bot application
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

        // Retrieve all the commands (as files)
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

            // If the user did not provide a command
            if (!client.commands.has(command)) {
                message.reply('please give me a command!');
                return;
            }

            // Attempt to execute the command
            try {
                client.commands.get(command).execute(message, args);
            } catch (error) {
                console.error(error);
                message.reply('there was an error trying to execute that command!');
            }
        });

        // Discord login - must be last item for the bot to connect properly
        client.login(config.discord.token);
    }

    /**
     * Initialises the Agenda.js task service
     */
    initTaskRunner() {
        const agenda = new Agenda({
            db: {address: config.databaseURL},
            processEvery: '5 minutes'
        });
    }
}

// Run the bot
new RonaBot();
