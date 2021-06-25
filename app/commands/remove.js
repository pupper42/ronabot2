const config = require('../config');
const Server = require('../controllers/server');

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

        async function deleteLocation() {
            try {
                await Server.removeLocation(serverId, location);
                const embed = {
                    color: '#ffe360',
                    author: {
                        name: 'RonaBot v2',
                        icon_url: config.discord.icon
                    },
                    fields: [
                        {name: 'Removed', value: location}
                    ]
                };
                await message.channel.send({embed: embed});
            } catch(e) {
                console.log(e);
            }
        }

        deleteLocation();
    },
};
