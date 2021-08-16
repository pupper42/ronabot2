const config = require('../config');
const Server = require('../controllers/server');
const PermissionsService = require('../services/permissionsService');
const MessagingService = require('../services/messagingService');
const { SlashCommandBuilder } = require('@discordjs/builders');

/**
 * Add a location to the database
 *
 * @type {{name: string, description: string, execute(*, *): void}}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Add a location')
        .addStringOption(option =>
            option.setName('location')
                .setDescription('The location you want to add.')
                .setRequired(true)),
    async execute(interaction) {
        let messageServer = interaction.guild.id;
        let newLocation = interaction.options.getString('location');

        if (!PermissionsService.checkPermissions(interaction)) {
            return;
        }

        // TODO: Hard coded locations, change later cant be bothered doing it now lol
        if (!config.availableLocations.includes(newLocation)) {
            await interaction.reply({embed: MessagingService.getMessage('invalidLocation')});
            return
        }

        Server.update(messageServer, {$addToSet: {location: [newLocation]}});

        const fields = {
            fields: [
                {name: 'Added new location:', value: newLocation}
            ]
        };

        await interaction.reply({embed: MessagingService.getMessage('addedLocation', fields)});
    },
};
