const MessagingService = require('../services/messagingService');
const {SlashCommandBuilder} = require("@discordjs/builders");

/**
 * Ardex :heart:
 * Dedicated to the 'elite study venue' Discord server by Ardex for providing us with a testing ground for the bot
 *
 * @type {{author: {icon_url: string, name: string}, name: string, description: string, execute(*): void}}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ardex')
        .setDescription('Ardex! The bot loves you!'),
    async execute(interaction) {
        await interaction.reply({embeds: [MessagingService.getMessage('ardex')]});
    },
};
