const MessagingService = require('../services/messagingService');

/**
 * Returns help text
 *
 * @type {{name: string, description: string, execute(*): void}}
 */
module.exports = {
    name: 'help',
    description: 'Return list of commands available for use',
    execute(message) {
        message.channel.send({embed: MessagingService.getMessage('help')});
    },
};
