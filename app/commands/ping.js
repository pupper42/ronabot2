module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(message) {
        const embed = {
            color: '#ffe360',
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
