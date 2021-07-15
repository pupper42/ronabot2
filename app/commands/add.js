const config = require('../config');
const Server = require('../controllers/server');

/**
 * Add a location to the database
 *
 * @type {{name: string, description: string, execute(*, *): void}}
 */
module.exports = {
    name: 'add',
    description: 'Add a location',
    execute(message, args) {
        let messageServer = message.guild.id;
        let newLocation = args.join(" ");

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

        // TODO: Hard coded locations, change later cant be bothered doing it now lol
        if (config.availableLocations.includes(newLocation) == false) {
            const errorEmbed = {
                title: "Error!",
                description: "Please specify a location (vic, nsw, act, tas, qld, wa or sa)",
                color: '#ffe360',
                author: {
                    name: 'RonaBot v2',
                    icon_url: config.discord.icon
                },
            };
            message.channel.send({embed: errorEmbed});
            return
        }

        Server.update(messageServer, {$addToSet: {location: [newLocation]}});

        const embed = {
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
            fields: [
                {name: 'Added new location:', value: newLocation}
            ]
        };
        message.channel.send({embed: embed});
    },
};
