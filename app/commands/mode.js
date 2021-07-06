const config = require('../../app/config');
const Server = require('../controllers/server');

/**
 * Enable the bot to use automatic notification updates
 *
 * @type {{name: string, description: string, execute(*): void}}
 */
module.exports = {
    name: 'mode',
    description: 'Set the bot to interval mode or time mode',
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

        async function mode(arg) {
            if (arg[0] == 'repeating') {
                await Server.update(serverId, {mode: 'repeating'});
                const embed = {
                    color: '#ffe360',
                    author: {
                        name: 'RonaBot v2',
                        icon_url: config.discord.icon
                    },
                    title: "Mode Changed",
                    description: "Currently set to repeating mode",
                    fields: []
                };
                await message.channel.send({embed: embed});

            } else if (arg[0] == 'scheduled') {
                await Server.update(serverId, {mode: 'scheduled'});
                const embed = {
                    color: '#ffe360',
                    author: {
                        name: 'RonaBot v2',
                        icon_url: config.discord.icon
                    },
                    title: "Mode Changed",
                    description: "Currently set to scheduled mode",
                    fields: []
                };
                await message.channel.send({embed: embed});                
            }
            else {
                const errorEmbed = {
                    title: "Error!",
                    description: "Please choose repeated or scheduled!",
                    color: '#ffe360',
                    author: {
                        name: 'RonaBot v2',
                        icon_url: config.discord.icon
                    },
                };
                await message.channel.send({embed: errorEmbed});        
            }            
        }

        mode(args);
    },
};
