const Server = require('../controllers/server');
const PermissionsService = require('../services/permissionsService');
const MessagingService = require('../services/messagingService');
const { SlashCommandBuilder } = require('@discordjs/builders');

/**
 * Enable or disable the bot to use automatic notification updates
 *
 * @type {{name: string, description: string, execute(*): void}}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('toggle')
        .setDescription('Toggle off or on the bot alerts'),
    async execute(interaction, args) {
        let serverId = interaction.guild.id;

        if (!PermissionsService.checkPermissions(interaction)) {
            return;
        }

        if (arg[0] === "on") {
            await Server.update(serverId, {'constantly_update': true});
            await interaction.reply({embed: MessagingService.getMessage('toggleOn')});
        } else if (arg[0] === "off") {
            await Server.update(serverId, {'constantly_update': false});
            await interaction.reply({embed: MessagingService.getMessage('toggleOff')});
        } else {
            await interaction.reply({embed: MessagingService.getMessage('toggleError')});
        }
    },
};
