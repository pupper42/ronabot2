const config = require('../config');
const Server = require('../controllers/server');

/**
 * Returns locations that are added to a specific Discord server
 *
 * @type {{name: string, description: string, execute(*, *): void}}
 */
module.exports = {
    name: 'list',
    description: 'List locations added by a server',
    execute(message, args) {
        // Also use args[0], args[1] to process the user input
        let serverId = message.guild.id;

        async function sendLocations() {
            let doc = await Server.getDoc(serverId);
            const embed = {
                color: '#ffe360',
                author: {
                    name: 'RonaBot v2',
                    icon_url: config.discord.icon
                },
                fields: [
                    {name: 'Locations added:', value: doc.location}
                ]
            };
            await message.channel.send({embed: embed});
        }

        sendLocations();
    },
};
