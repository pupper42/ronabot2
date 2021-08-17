/**
 * Permissions Service
 *
 * Check if user has permissions
 */
const MessagingService = require('../services/messagingService');
const { Permissions } = require('discord.js');

exports.checkPermissions = function(interaction) {
    if (!(interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) || interaction.member.roles.cache.some(r => r.name === "Rona"))) {
        interaction.channel.send({embeds: [MessagingService.getMessage('roleError')]});
        return false;
    }
    return true;
}
