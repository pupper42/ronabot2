const Server = require('../controllers/server');
const MessagingService = require('../services/messagingService');
const { DateTime } = require('luxon');

/**
 * Returns locations that are added to a specific Discord server
 *
 * @type {{name: string, description: string, execute(*, *): void}}
 */
module.exports = {
    name: 'status',
    description: 'Show current settings and ping for the server',
    execute(message, args) {
        // Also use args[0], args[1] to process the user input
        let serverId = message.guild.id;
        let updateChannel;
        

        async function getStatus() {
            let doc = await Server.getDoc(serverId);
            try {
                updateChannel = message.guild.channels.cache.get(doc.update_channel).name;
            }
            catch {
                updateChannel = "Not set"
            }

            const fields = {
                fields: [
                    {name: 'Locations', value: (doc.location.length === 0) ? "Not set" : doc.location},
                    {name: 'Constantly update?', value: doc.constantly_update},
                    {name: 'Update interval', value: `${doc.update_interval} minutes`},
                    {name: 'Update channel', value: updateChannel},
                    {name: 'Ping', value: `:hourglass: ${Date.now() - message.createdTimestamp}ms, :stopwatch: ${Math.round(message.client.ws.ping)}ms`}
                ]
            };

            message.channel.send({embed: MessagingService.getMessage('status', fields)});
            
        }

        getStatus();
    },
};
