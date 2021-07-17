const MessagingService = require('../services/messagingService');

/**
 * Ardex :heart:
 * Dedicated to the 'elite study venue' Discord server by Ardex for providing us with a testing ground for the bot
 *
 * @type {{author: {icon_url: string, name: string}, name: string, description: string, execute(*): void}}
 */
module.exports = {
    name: 'ardex',
    author: {
        name: 'RonaBot v2',
        icon_url: 'https://i.imgur.com/2ojyW5z.png'
    },
    description: 'Ardex! The bot loves you!',
    execute(message) {
        message.channel.send({embed: MessagingService.getMessage('ardex')});
    },
};
