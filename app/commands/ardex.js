module.exports = {
    name: 'ardex',
    author: {
        name: 'RonaBot v2',
        icon_url: 'https://i.imgur.com/rUakJmE.png'
    },
    description: 'Ardex! The bot loves you!',
    execute(message) {
        const embed = {
            color: '#e31b23',
            description: ':heart:'
        };
        message.channel.send({embed: embed});
    },
};
