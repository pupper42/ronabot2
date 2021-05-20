module.exports = {
    name: 'ardex',
    description: 'Ardex! The bot loves you!',
    execute(message) {
        const embed = {
            color: '#e31b23',
            description: ':heart:'
        };
        message.channel.send({embed: embed});
    },
};
