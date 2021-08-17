/**
 * Permissions Service
 *
 * Check if user has permissions
 */
const MessagingService = require('../services/messagingService');

exports.checkPermissions = function(interaction) {
    if (!(interaction.member.hasPermission("ADMINISTRATOR") || interaction.member.roles.cache.some(r => r.name === "Rona"))) {
        interaction.channel.send({embeds: [MessagingService.getMessage('roleError')]});
        return false;
    }
    return true;
}
