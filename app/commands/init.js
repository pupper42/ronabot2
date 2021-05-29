const Server = require('../controllers/server');

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
                fields: [
                    {name: `'${channelName}' set`, value: "Will send updates to this channel if automatic updates are turned on. Enable automatic updates with `/ronabot on`"}
                ]
            };
            await message.channel.send({embed: embed});
        }

        init();
    },
};
