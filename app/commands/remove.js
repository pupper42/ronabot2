const Server = require('../controllers/server');
const PermissionsService = require('../services/permissionsService');
const MessagingService = require('../services/messagingService');

/**
 * Removes a location from the server
 *
 * @type {{name: string, description: string, execute(*, *): void}}
 */
module.exports = {
    name: 'remove',
    description: 'Remove a location',
    execute(message, args) {
        let serverId = message.guild.id;
        let location = args[0];

        if (!PermissionsService.checkPermissions(message)) {
            return;
        }

        async function removeLocation() {
            try {
                await Server.removeLocation(serverId, location);
                const fields = {
                    fields: [
                        {name: 'Removed', value: location}
                    ]
                };
                await message.channel.send({embed: MessagingService.getMessage('removedLocation', fields)});
            } catch(e) {
                console.log(e);
            }
        }

        removeLocation();
    },
};
