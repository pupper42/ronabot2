const config = require('../config');

module.exports = {
    name: 'ardex',
    author: {
        name: 'RonaBot v2',
        icon_url: 'https://i.imgur.com/2ojyW5z.png'
    },
    description: 'Ardex! The bot loves you!',
    execute(message) {
        const embed = {
            color: '#e31b23',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
            description: ':heart:'
        };
        message.channel.send({embed: embed});
    },
};
