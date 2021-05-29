const config = require('../../app/config');
const Server = require('../controllers/server');

module.exports = {
    name: 'help',
    description: 'Return list of commands available for use',
    execute(message) {
        const prefix = config.discord.prefix + ' ';
        const embed = {
            color: '#ffe360',
            title: 'Ronabot Commands',
            description: 'List of commands that Ronabot will accept!',
            fields: [
                {
                    name: prefix + 'add [location]',
                    value: 'Add a new location to the server',
                },
                {
                    name: prefix + 'get [location]',
                    value: 'Return a single location\'s statistics',
                },
                {
                    name: prefix + 'help',
                    value: 'Well you\'re looking at it right now, aren\'t you?',
                },
                {
                    name: prefix + 'init',
                    value: 'Initialise the current channel for the bot',
                },
                {
                    name: prefix + 'list',
                    value: 'Lists all the locations added to this server',
                },
                {
                    name: prefix + 'off',
                    value: 'Turn off auto updates for the server',
                },
                {
                    name: prefix + 'on',
                    value: 'Turn off auto updates for the server',
                },
                {
                    name: prefix + 'ping',
                    value: 'Get the current latency between the bot and the Discord server'
                },
                {
                    name: prefix + 'remove [location]',
                    value: 'Remove a location from the server'
                },
                {
                    name: prefix + 'setinterval [time]',
                    value: 'Set the interval between server notifications'
                }
            ]
        };
        message.channel.send({embed: embed});
    },
};
