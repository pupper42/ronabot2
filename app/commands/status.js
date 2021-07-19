const moment = require('moment');
const Server = require('../controllers/server');
const MessagingService = require('../services/messagingService');

/**
 * Returns locations that are added to a specific Discord server
 *
 * @type {{name: string, description: string, execute(*, *): void}}
 */
module.exports = {
    name: 'status',
    description: 'Show current settings and ping for the server',
    execute(message, args) {
        let serverId = message.guild.id;
        let updateChannel;

        async function getStatus() {
            let server = await Server.getServer(serverId);

            try {
                updateChannel = message.guild.channels.cache.get(server.update_channel).name;
            }
            catch {
                updateChannel = 'Not set';
            }

            const fields = {
                fields: [
                    {name: 'Locations', value: (server.location.length === 0) ? "Not set" : server.location},
                    {name: 'Mode', value: server.mode},
                    {name: 'Constantly update?', value: server.constantly_update},
                    {name: 'Update interval', value: `${server.update_interval} minutes`},
                    {name: 'Update channel', value: updateChannel},
                    {name: (server.mode === 'scheduled') ? "Next update" : "Last updated", value: moment(server.updated_at).format('DD/MM/YYYY HH:mm')},
                    {name: 'Ping', value: `:hourglass: ${Date.now() - message.createdTimestamp}ms, :stopwatch: ${Math.round(message.client.ws.ping)}ms`}
                ]
            };

            message.channel.send({embed: MessagingService.getMessage('status', fields)});
        }

        getStatus();
    },
};
