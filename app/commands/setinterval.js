const config = require('../config');
const Server = require('../controllers/server');

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
        let timeMinutes;
        let timeSec;
        let serverId = message.guild.id;

        try {
            timeMinutes = parseFloat(args[0]);
            timeSec = timeMinutes * 60;
            console.log(timeMinutes);
            console.log(timeSec);
        }
        catch {
            const errorEmbed = {
                color: '#ffe360',
                title: "Error!",
                description: "Please type a number!",
                author: {
                    name: 'RonaBot v2',
                    icon_url: config.discord.icon
                },
                fields: []
            };

            message.channel.send({embed: errorEmbed});
        }

        const embed = {
            color: '#ffe360',
            title: "Update interval set!",
            description: `Currently set to ${timeMinutes} minutes`,
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
            fields: []
        };

        Server.update(serverId, {update_interval: timeSec});
        message.channel.send({embed: embed});
    },
};
