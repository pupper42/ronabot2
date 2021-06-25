const config = require('../config');
const Server = require('../controllers/server');

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

        Server.update(messageServer, {$addToSet: {location: [newLocation]}});

        const embed = {
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
            fields: [
                {name: 'Added new location:', value: newLocation}
            ]
        };
        message.channel.send({embed: embed});
    },
};
