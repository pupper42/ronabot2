const Server = require('../controllers/server');
const PermissionsService = require('../services/permissionsService');
const MessagingService = require('../services/messagingService');
const { SlashCommandBuilder } = require('@discordjs/builders');

/**
 * Removes a location from the server
 *
 * @type {{name: string, description: string, execute(*, *): void}}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Remove a location'),
    async execute(interaction, args) {
        let serverId = interaction.guild.id;
        let location = args[0];

        if (!PermissionsService.checkPermissions(interaction)) {
            return;
        }

        try {
            await Server.removeLocation(serverId, location);
            const fields = {
                fields: [
                    {name: 'Removed', value: location}
                ]
            };
            await interaction.reply({embed: MessagingService.getMessage('removedLocation', fields)});
        } catch(e) {
            console.log(e);
        }
    },
};
