const Server = require('../controllers/server');
const MessagingService = require('../services/messagingService');
const { DateTime } = require('luxon');
const { SlashCommandBuilder } = require('@discordjs/builders');

/**
 * Returns locations that are added to a specific Discord server
 *
 * @type {{name: string, description: string, execute(*, *): void}}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Show current settings and ping for the server'),
    async execute(interaction) {
        let serverId = interaction.guild.id;
        let updateChannel;
        let server = await Server.getServer(serverId);

        try {
            updateChannel = interaction.guild.channels.cache.get(server.update_channel).name;
        }
        catch {
            updateChannel = 'Not set';
        }

        // Check if server has a valid updated_at date and format the output accordingly
        if (server.updated_at == null) {
            updatedAt = 'N/A';
        } else {
            updatedAt = DateTime.fromISO(server.updated_at.toISOString()).toFormat('dd/MM/y HH:mm').toString() + ' GMT+0';
        }

        // Compile the fields to be sent to the MessagingService
        const fields = {
            fields: [
                {name: 'Locations', value: (server.location.length === 0) ? "Not set" : server.location},
                {name: 'Mode', value: server.mode},
                {name: 'Constantly update?', value: server.constantly_update},
                {name: 'Update interval', value: `${server.update_interval} minutes`},
                {name: 'Update channel', value: updateChannel},
                {name: "Next update", value: updatedAt},
                {name: 'Ping', value: `:hourglass: ${Date.now() - interaction.createdTimestamp}ms, :stopwatch: ${Math.round(interaction.client.ws.ping)}ms`}
            ]
        };

        await interaction.reply({embed: MessagingService.getMessage('status', fields)});
    },
};
