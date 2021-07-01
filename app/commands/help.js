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
                    name: prefix + 'add [location]',
                    value: 'Add a location to provide automatic updates for. Current available locations are: `vic, nsw, qld, wa, sa, tas, nt, act`',
                },
                {
                    name: prefix + 'remove [location]',
                    value: 'Remove a location to provide automatic updates for'
                },
                {
                    name: prefix + 'list',
                    value: 'Lists all the locations that have automatic updates enabled',
                },
                {
                    name: prefix + 'get [location]',
                    value: 'Return a single location\'s statistics',
                },
                {
                    name: prefix + 'init',
                    value: 'Initialise the current channel for the bot. Still need to do `/rb on` to enable automatic updates',
                },
                {
                    name: prefix + 'on',
                    value: 'Turn on auto updates for the server',
                },
                {
                    name: prefix + 'off',
                    value: 'Turn off auto updates for the server',
                },
                {
                    name: prefix + 'setinterval [time]',
                    value: 'Set the how often the bot should check for updates (in minutes) if auto updates are on. If an update is found it will send it to the initialised channel.'
                },
                {
                    name: prefix + 'addserver',
                    value: 'If the bot isn\'t detecting your server then use this command'
                },
                {
                    name: prefix + 'ping',
                    value: 'Get the current latency between the bot and the Discord server'
                },
                {
                    name: prefix + 'addserver',
                    value: 'If the bot doesn\'t detect your server, then use this command. WARNING: WILL REVERT ALL SETTINGS TO DEFAULT!!!',
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
