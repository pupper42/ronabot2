const config = require('../../app/config');

/**
 * Returns help text
 *
 * @type {{name: string, description: string, execute(*): void}}
 */
module.exports = {
    name: 'help',
    description: 'Return list of commands available for use',
    execute(message) {
        const prefix = config.discord.prefix + ' ';
        const embed = {
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
            title: 'Ronabot Commands',
            description: 'List of commands that Ronabot will accept!',
            fields: [
                {
                    name: prefix + 'settings',
                    value: 'Show the current settings for the server',
                },
                {
                    name: prefix + 'get [location]',
                    value: 'Return a single location\'s statistics. Current available locations are: `vic, nsw, qld, wa, sa, tas, nt, act`',
                },
                {
                    name: prefix + 'add [location]',
                    value: 'Add a location to provide automatic updates for. Current available locations are: `vic, nsw, qld, wa, sa, tas, nt, act`',
                },
                {
                    name: prefix + 'remove [location]',
                    value: 'Remove a location to provide automatic updates for'
                },
                {
                    name: prefix + 'init [repeating/scheduled] [time]',
                    value: 'Use the current channel for automatic updates and choose auto update mode. Choose repeating if you want the bot to send updates according to a time interval (in minutes). Choose scheduled if you want the bot to send an update at a specific time of the day (in 24h time without the colons like 0930 or 1554). Use `/rb toggle off` if you want to stop receiving auto updates',
                },
                {
                    name: prefix + 'toggle [on/off]',
                    value: 'Toggle on or off auto updates for the server',
                },
                {
                    name: prefix + 'help',
                    value: 'Well you\'re looking at it right now, aren\'t you?',
                },
            ]
        };
        message.channel.send({embed: embed});
    },
};
