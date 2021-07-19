/**
 * Permissions Service
 *
 * Check if user has permissions
 */
const MessagingService = require('../services/messagingService');

exports.checkPermissions = function() {
    if (!(message.member.hasPermission("ADMINISTRATOR") || message.member.roles.cache.some(r => r.name === "Rona"))) {
        message.channel.send({embed: MessagingService.getMessage('roleError')});
        return false;
    }
    return true;
}
