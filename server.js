/**
 * Welcome to RonaBot v2!
 */

// System
const fs = require('fs');
const path = require('path');

// Config
const config = require('./app/config');

// Vendors
const moment = require('moment');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const client = new Discord.Client();
const Agenda = require('agenda');

// Controllers
const Server = require('./app/controllers/server');
const Statistics = require('./app/controllers/statistic');

// Services
const Url = require('./app/services/urlService');
const Scraper = require('./app/services/scraperService');
const MessagingService = require('./app/services/messagingService');

class RonaBot {

    /**
     * Constructor - load the bot!
     */
    constructor() {
        this.initDatabaseConnection();
        this.initDiscord();
        this.initAgenda();
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
            client.user.setActivity(" '/rb help'", {type: "LISTENING"});
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

        // Listen to when the bot joins a new server
        client.on('guildCreate', guild => {
            console.log(guild);
            Server.create(guild.id, guild.name);
        });

        // Listen to Discord messages
        client.on('message', message => {
            let lowercaseMessage = message.content.toLowerCase();

            const commandText = lowercaseMessage.split(' ', 1);

            // Check if bot prefix matches exactly as first message substring parsed
            if ((commandText[0] !== config.discord.prefix) || message.author.bot) return;

            const args = lowercaseMessage.slice(config.discord.prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();

            // If the user did not provide a command
            if (!client.commands.has(command)) {
                message.reply('please give me a valid command! See `'+config.discord.prefix+' help` for list of commands.');
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
    initAgenda() {
        // Initialise the task runner
        const agenda = new Agenda({
            db: {address: config.databaseURL},
            processEvery: '1 minute',
            useUnifiedTopology: true
        });

        // Define the job
        agenda.define('get latest statistics', async job => {
            job.repeatEvery('15 minutes');

            // Scrape website data every 15 minutes
            // Grab all locations in database
            Statistics.all().then(res => {
                res.forEach(async function (location, index) {
                    try {
                        // Get the URL
                        let url = Url.getUrl(location);

                        // Update location data
                        await Scraper.getData(url, location);

                        // Notify on success!
                        console.log(`Location statistics for ${location} updated!`);
                    } catch (e) {
                        console.log("Error!: " + e);
                    }
                });
            });
        });

        agenda.define('notify servers', async job => {
            job.repeatEvery('1 minute');

            // Get all servers and their intervals
            Server.getServers().then(res => {
                res.forEach(async function (server, index) {
                    console.log('Server:'+server.name+' | Constantly update: '+server.constantly_update+' | Locations: '+server.location.length);

                    // Check if server is allowed to constantly update
                    if (!server.constantly_update || server.location.length < 1 || server.update_channel == 0) {
                        return;
                    }

                    // Check if any server requires notification (get updated_at and interval)
                    let updatedAt = moment(server.updated_at);
                    let currentTime = moment(new Date());
                    let nextRunDate = currentTime;
                    let locations = server.location;
                    let notify = false;

                    // Check server mode and update the datetime accordingly
                    if ((server.mode === 'scheduled') && currentTime >= updatedAt) {
                        notify = true;
                        nextRunDate = moment(updatedAt).add(1, 'days');
                    } else if((server.mode === 'repeating') && currentTime.diff(updatedAt, 'minutes') >= server.update_interval) {
                        notify = true;
                    }

                    // Check if notify is a go
                    if (notify) {
                        locations.forEach(function (location) {
                            // Get the statistics
                            Statistics.read(location).then(res => {
                                const updateData = res;

                                const fields = {
                                    title: `${updateData.last_updated} report for ${location.toUpperCase()}`,
                                    fields: [
                                        {name: 'New local cases', value: updateData.new_lcases, inline: true},
                                        {name: 'New overseas cases', value: updateData.new_ocases, inline: true},
                                        {name: '\u200b', value: '\u200b', inline: true},
                                        {name: 'Total local cases', value: updateData.total_lcases, inline: true},
                                        {name: 'Total overseas cases', value: updateData.total_ocases, inline: true},
                                        {name: '\u200b', value: '\u200b', inline: true},
                                        {name: 'Active cases', value: updateData.active_cases, inline: true},
                                        {name: 'Deaths', value: updateData.deaths, inline: true},
                                        {name: '\u200b', value: '\u200b', inline: true},
                                        {name: 'Tests', value: updateData.tests, inline: true},
                                        {name: 'Vaccinations', value: updateData.vaccinations, inline: true},
                                        {name: '\u200b', value: '\u200b', inline: true},
                                    ]
                                };

                                // Send the message to the specific server channel
                                client.channels.cache.get(server.update_channel).send({embed:  MessagingService.getMessage('locationStats', fields)});
                            });
                        });

                        Server.update(server.server_id, {updated_at: nextRunDate});
                    }
                });
            });
        });

        // Start the job scheduler
        (async function() {
            await agenda.start();
            await agenda.every('15 minutes', 'get latest statistics');
            await agenda.every('1 minute', 'notify servers');
        })();
    }
}

// Run the bot
new RonaBot();
