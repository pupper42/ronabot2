const config = require('../config');
const Server = require('../controllers/server');

/**
 * Returns locations that are added to a specific Discord server
 *
 * @type {{name: string, description: string, execute(*, *): void}}
 */
module.exports = {
    name: 'settings',
    description: 'Show current settings for the server',
    execute(message, args) {
        // Also use args[0], args[1] to process the user input
        let serverId = message.guild.id;
        let updateChannel;

        async function sendSettings() {

            let doc = await Server.getDoc(serverId);
            try {
                updateChannel = message.guild.channels.cache.get(doc.update_channel).name;
            }
            catch {
                updateChannel = "Not set"
            }

            console.log(doc.location);
            

            const embed = {
                color: '#ffe360',
                author: {
                    name: 'RonaBot v2',
                    icon_url: config.discord.icon
                },
                title: `Current settings`,
                fields: [
                    {name: 'Locations', value: (doc.location.length == 0) ? "Not set" : doc.location},
                    {name: 'Constantly update?', value: doc.constantly_update},
                    {name: 'Update interval', value: `${doc.update_interval / 60} minutes`}, 
                    {name: 'Update channel', value: updateChannel},                    
                ]
            };

            message.channel.send({embed: embed});
        }

        sendSettings();
    },
};
