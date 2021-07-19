const config = require('../../app/config');
const Server = require('../controllers/server');
const MessagingService = require('../services/messagingService');

/**
 * Disnable the bot to use automatic notification updates
 *
 * @type {{name: string, description: string, execute(*): void}}
 */
module.exports = {
    name: 'toggle',
    description: 'Toggle off or on the bot alerts',
    execute(message, args) {
        let serverId = message.guild.id;

        if (!(message.member.hasPermission("ADMINISTRATOR") || message.member.roles.cache.some(r => r.name === "Rona"))) {
            message.channel.send({embed: MessagingService.getMessage('roleError')});
            return
        }

        async function toggle(arg) {
            if (arg[0] === "on") {
                await Server.update(serverId, {'constantly_update': true});
                await message.channel.send({embed: MessagingService.getMessage('toggleOn')});
            } else if (arg[0] === "off") {
                await Server.update(serverId, {'constantly_update': false});
                await message.channel.send({embed: MessagingService.getMessage('toggleOff')});
            } else {
                await message.channel.send({embed: MessagingService.getMessage('toggleError')});
            }
        }

        toggle(args);
    },
};
