/**
 * Welcome to RonaBot v2!
 */
// System
const fs = require('fs');
const path = require('path');

// Config
const config = require('./app/config');

// Vendors
const { DateTime } = require('luxon');
const mongoose = require('mongoose');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
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
        const commands = [];

        client.once('ready', () => {
            console.log(`Logged in as ${client.user.tag}`);
            client.guilds.cache.forEach(guild => {
                console.log(`${guild.name} | ${guild.id}`);
            });
            client.user.setActivity(" '/help'", {type: "LISTENING"});
        });

        // Load the Discord listener
        client.commands = new Collection();

        // Retrieve all the commands (as files) and also register the commands
        const commandFiles = fs.readdirSync(path.resolve(__dirname, './app/commands')).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(path.resolve(__dirname, `./app/commands/${file}`));
            // set a new item in the Collection
            // with the key as the command name and the value as the exported module
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
        }

        // Listen to when the bot joins a new server
        client.on('guildCreate', guild => {
            console.log(guild);
            Server.create(guild.id, guild.name);
        });

        // Set the commands to the Discord server
        const rest = new REST({ version: '9' }).setToken(config.discord.token);

        // Get each server and register the slash commands
        Server.getServers().then(res => {
            res.forEach(async function (server) {
                try {
                    console.log(`Started refreshing application (/) commands for server: ${server.name}.`);

                    await rest.put(
                        Routes.applicationGuildCommands(config.discord.client_id, `${server.server_id}`),
                        { body: commands },
                    );

                    console.log(`Successfully reloaded application (/) commands for server: ${server.name}.`);
                } catch (error) {
                    console.error(error);
                }
            });
        });

        // Listen to Discord messages
        client.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) return;

            const { commandName } = interaction;

            // If the user did not provide a command
            if (!client.commands.has(commandName)) {
                await interaction.reply({content: 'Please give me a valid command! See `/help` for list of commands.'});
                return;
            }

            // Attempt to execute the command
            try {
                client.commands.get(commandName).execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({content: 'There was an error trying to execute that command!'});
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
                res.forEach(async function (location) {
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
                res.forEach(async function (server) {
                    console.log('Server: '+server.name+' | Constantly update: '+server.constantly_update+' | Locations: '+server.location.length);

                    // Check if server is allowed to constantly update
                    if (!server.constantly_update || server.location.length < 1 || server.updated_at == null || server.mode == null || !server.update_channel) {
                        return;
                    }

                    // Check if any server requires notification (get updated_at and interval)
                    //let updatedAt = DateTime.fromFormat(server.updated_at);
                    let updatedAt = DateTime.fromISO(server.updated_at.toISOString());
                    let currentTime = DateTime.now();
                    let nextRunDate;
                    let locations = server.location;

                    // Check server mode and update the datetime accordingly
                    if ((server.mode === 'scheduled') && currentTime >= updatedAt) {
                        nextRunDate = updatedAt.plus({ days: 1 }).toISO();
                    } else if((server.mode === 'repeating') && currentTime >= updatedAt) {
                        nextRunDate = updatedAt.plus({ minutes: parseInt(server.update_interval) }).toISO();
                    } else {
                        return;
                    }

                    // Check if notify is a `go
                    locations.forEach(function (location) {
                        // Get the statistics
                        Statistics.read(location).then(res => {
                            const updateData = res;

                            const fields = {
                                title: `${updateData.last_updated} report for ${location.toUpperCase()}`,
                                fields: [
                                    {name: 'New cases', value: `${updateData.new_cases}`, inline: true},
                                    {name: '7 Day Case Average', value: `${updateData.case_av}`, inline: true},
                                    {name: '\u200b', value: '\u200b', inline: true},
                                    {name: 'Total cases', value: `${updateData.total_cases}`, inline: true},
                                    {name: 'Active cases', value: `${updateData.active_cases}`, inline: true},
                                    {name: '\u200b', value: '\u200b', inline: true},
                                    {name: 'Tests', value: `${updateData.tests}`, inline: true},
                                    {name: 'Deaths', value: `${updateData.deaths}`, inline: true},
                                    {name: '\u200b', value: '\u200b', inline: true},
                                    {name: 'First Dose', value: `${updateData.f_dose}`, inline: true},
                                    {name: 'Second Dose', value: `${updateData.s_dose}`, inline: true},
                                    {name: '\u200b', value: '\u200b', inline: true},
                                    {name: 'Third Dose', value: `${updateData.t_dose}`, inline: true},
                                    {name: '\u200b', value: '\u200b', inline: true},
                                ]
                            };

                            // Send the message to the specific server channel
                            try {
                                client.channels.cache.get(server.update_channel).send({embeds: [MessagingService.getMessage('locationStats', fields)]});
                            } catch (e) {
                                console.log(e);
                            }
                        });
                    });

                    Server.update(server.server_id, {updated_at: nextRunDate});
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
