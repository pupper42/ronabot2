const config = require('../../app/config');
const Server = require('../controllers/server');

/**
 * Disnable the bot to use automatic notification updates
 *
 * @type {{name: string, description: string, execute(*): void}}
 */
module.exports = {
    name: 'toggle',
    description: 'Toggle off or on the bot alerts',
    execute(message, args) {
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

        async function toggle(arg) {
            if (arg[0] === "on") {
                await Server.update(serverId, {'constantly_update': true});
                const embed = {
                    color: '#ffe360',
                    author: {
                        name: 'RonaBot v2',
                        icon_url: config.discord.icon
                    },
                    title: 'Automatic updates turned on',
                    description: `Use \`${config.discord.prefix} toggle off\` to turn it back off`,
                    fields: []
                };
                await message.channel.send({embed: embed});
            } else if (arg[0] === "off") {
                await Server.update(serverId, {'constantly_update': false});
                const embed = {
                    color: '#ffe360',
                    author: {
                        name: 'RonaBot v2',
                        icon_url: config.discord.icon
                    },
                    title: 'Automatic updates turned off',
                    description: `Use \`${config.discord.prefix} toggle on\` to turn it back on`,
                    fields: []
                };
                await message.channel.send({embed: embed});
            } else {
                const errorEmbed = {
                    title: "Error!",
                    description: "Please specify on or off",
                    color: '#ffe360',
                    author: {
                        name: 'RonaBot v2',
                        icon_url: config.discord.icon
                    },
                };
                await message.channel.send({embed: errorEmbed});
            }
        }

        toggle(args);
    },
};
