const MessagingService = require('../services/messagingService');
const { SlashCommandBuilder } = require('@discordjs/builders');

/**
 * Returns help text
 *
 * @type {{name: string, description: string, execute(*): void}}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Return list of commands available for use'),
    async execute(interaction) {
        await interaction.reply({embed: MessagingService.getMessage('help')});
    },
};
