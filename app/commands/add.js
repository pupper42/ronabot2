const config = require('../config');
const Server = require('../controllers/server');
const PermissionsService = require('../services/permissionsService');
const MessagingService = require('../services/messagingService');

/**
 * Add a location to the database
 *
 * @type {{name: string, description: string, execute(*, *): void}}
 */
module.exports = {
    name: 'add',
    description: 'Add a location',
    execute(message, args) {
        let messageServer = message.guild.id;
        let newLocation = args.join(" ");

        if (!PermissionsService.checkPermissions(message)) {
            return;
        }

        // TODO: Hard coded locations, change later cant be bothered doing it now lol
        if (!config.availableLocations.includes(newLocation)) {
            message.channel.send({embed: MessagingService.getMessage('invalidLocation')});
            return
        }

        Server.update(messageServer, {$addToSet: {location: [newLocation]}});

        const fields = {
            fields: [
                {name: 'Added new location:', value: newLocation}
            ]
        };

        message.channel.send({embed: MessagingService.getMessage('addedLocation', fields)});
    },
};
