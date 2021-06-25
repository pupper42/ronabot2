const config = require('../config');

/**
 * Sets the interval
 *
 * @type {{name: string, description: string, execute(*, *): void}}
 */
module.exports = {
    name: 'setinterval',
    description: 'Sets the timeout between alerts in minutes',
    execute(message, args) {
        // TODO: Link to services function to run updater/scraper to grab latest data from db
        // Also use args[0], args[1] to process the user input

        const embed = {
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
            fields: [

            ]
        };
        message.channel.send({embed: embed});
    },
};
