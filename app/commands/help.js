const config = require('../../app/config');

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
                    name: prefix + 'remove [location]',
                    value: 'Remove a location from the server'
                },
                {
                    name: prefix + 'list',
                    value: 'Lists all the locations added to this server',
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
                    value: 'Set the how often the bot should check for updates if auto updates are on. If an update is found it will send it to the initialised channel.'
                },               
                {
                    name: prefix + 'ping',
                    value: 'Get the current latency between the bot and the Discord server'
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
