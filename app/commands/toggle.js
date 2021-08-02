const Server = require('../controllers/server');
const PermissionsService = require('../services/permissionsService');
const MessagingService = require('../services/messagingService');

/**
 * Enable or disable the bot to use automatic notification updates
 *
 * @type {{name: string, description: string, execute(*): void}}
 */
module.exports = {
    name: 'toggle',
    description: 'Toggle off or on the bot alerts',
    execute(message, args) {
        let serverId = message.guild.id;

        if (!PermissionsService.checkPermissions(message)) {
            return;
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
