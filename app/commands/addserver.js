const Server = require('../controllers/server');
const config = require('../config');

/**
 * Adds a (discord) server to the database
 *
 * @type {{name: string, description: string, execute(*): void}}
 */
module.exports = {
    name: 'addserver',
    description: 'Add server to db',
    execute(message) {
        const serverId = message.guild.id;
        const serverName = message.guild.name;

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

        async function addserver() {
            
            await Server.create(serverId, serverName);
            const embed = {
                title: "Server added to database",
                description: "Server settings reverted to default!",
                color: '#ffe360',
                author: {
                    name: 'RonaBot v2',
                    icon_url: config.discord.icon
                },
            };
            await message.channel.send({embed: embed});
        }

        addserver();
    },
};
