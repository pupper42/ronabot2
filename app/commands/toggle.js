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
        .setDescription('Toggle off or on the bot alerts')
        .addSubcommand(subcommand =>
            subcommand
                .setName('on')
                .setDescription('Toggle notifications on.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('off')
                .setDescription('Toggle notifications off.')),
    async execute(interaction) {
        let serverId = interaction.guild.id;

        if (!PermissionsService.checkPermissions(interaction)) {
            return;
        }

        if (interaction.options.getSubcommand() === "on") {
            await Server.update(serverId, {'constantly_update': true});
            await interaction.reply({embeds: [MessagingService.getMessage('toggleOn')]});
        } else if (interaction.options.getSubcommand() === "off") {
            await Server.update(serverId, {'constantly_update': false});
            await interaction.reply({embeds: [MessagingService.getMessage('toggleOff')]});
        } else {
            await interaction.reply({embeds: [MessagingService.getMessage('toggleError')]});
        }
    },
};
