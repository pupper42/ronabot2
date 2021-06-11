module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(message) {
        const embed = {
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: 'https://i.imgur.com/2ojyW5z.png'
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
