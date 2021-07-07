const config = require('../config');
const Server = require('../controllers/server');

/**
 * Sets the interval
 *
 * NOTE: This is deprecated in favour of init.js command
 *
 * @type {{name: string, description: string, execute(*, *): void}}
 */
module.exports = {
    name: 'setinterval',
    description: 'Sets the timeout between alerts in minutes',
    execute(message, args) {
        let timeMinutes;
        let serverId = message.guild.id;

        if (!(message.member.hasPermission("ADMINISTRATOR") || message.member.roles.cache.some(r => r.name === "Rona"))) {
            const errorEmbed = {
                title: "Error!",
                description: "You must be admin or have the Rona role!",
                color: '#ffe360',
                author: {
                    name: 'RonaBot v2',
                    icon_url: config.discord.icon
                },
            };
            message.channel.send({embed: errorEmbed});
            return
        }

        const errorEmbed = {
            color: '#ffe360',
            title: "Error!",
            description: "Please type a number between 1 and 4320!",
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
            fields: []
        };

        try {
            timeMinutes = parseFloat(args[0]);
            console.log(timeMinutes);
            if (timeMinutes >= 1 && timeMinutes <= 4320) {

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

                Server.update(serverId, {update_interval: timeMinutes});
                message.channel.send({embed: embed});
            }
            else {
                message.channel.send({embed: errorEmbed});
            }
        }
        catch {
            message.channel.send({embed: errorEmbed});
        }
    },
};
