const config = require('../config');

module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(message) {
        const embed = {
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
            fields: [
                {
                    name: ':hourglass:',
                    value: `${Date.now() - message.createdTimestamp}ms`,
                    inline: true,
                },
                {
                    name: ':stopwatch:',
                    value: `${Math.round(message.client.ws.ping)}ms`,
                    inline: true,
                },
            ]
        };
        message.channel.send({embed: embed});
    },
};
