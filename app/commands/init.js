const config = require('../config');
const Server = require('../controllers/server');

/**
 * Inits the bot to a specific channel to output messages to
 *
 * @type {{name: string, description: string, execute(*): void}}
 */
module.exports = {
    name: 'init',
    description: 'Set the channel to send updates in',
    execute(message) {
        // TODO: Link to services function to run updater/scraper to grab latest data from db
        // Also use args[0], args[1] to process the user input

        let serverId = message.guild.id;
        let channelId = message.channel.id;
        let channelName = message.channel.name;

        async function init() {
            await Server.update(serverId, {'update_channel': channelId});
            const embed = {
                color: '#ffe360',
                author: {
                    name: 'RonaBot v2',
                    icon_url: config.discord.icon
                },
                fields: [
                    {name: `'${channelName}' set`, value: "Will send updates to this channel if automatic updates are turned on. Enable automatic updates with `/ronabot on`"}
                ]
            };
            await message.channel.send({embed: embed});
        }

        init();
    },
};
