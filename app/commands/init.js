const config = require('../config');
const Server = require('../controllers/server');

/**
 * Inits the bot to a specific channel to output messages to
 *
 * @type {{name: string, description: string, execute(*): void}}
 */
module.exports = {
    name: 'init',
    description: 'Set the channel to send updates in',
    execute(message, args) {
        // Also use args[0], args[1] to process the user input

        let serverId = message.guild.id;
        let channelId = message.channel.id;
        let channelName = message.channel.name;
        let mode = args[1];
        let time = args[2];

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

        async function init(mode, time) {
            if (mode === 'repeating') {
                try {
                    let timeMin = parseFloat(time);
                    await Server.update(serverId, {update_channel: channelId});
                } catch {
                    const errorEmbed = {
                        title: "Error!",
                        description: "Please enter a number between 1 and 4320!",
                        color: '#ffe360',
                        author: {
                            name: 'RonaBot v2',
                            icon_url: config.discord.icon
                        },
                    };
                    message.channel.send({embed: errorEmbed});
                }
                await Server.update(serverId, {update_channel: channelId});
                await Server.update(serverId, {mode: 'repeating', constantly_update: true});

                const embed = {
                    color: '#ffe360',
                    author: {
                        name: 'RonaBot v2',
                        icon_url: config.discord.icon
                    },
                    title: `Using '${channelName}' for auto updates`,
                    description: `Set to repeating mode, will send an update every ${time} minutes. Turn off auto updates with \`/rb toggle off\``,
                    fields: []
                };
                await message.channel.send({embed: embed});

            } else if (mode === 'scheduled') {
                await Server.update(serverId, {update_channel: channelId});
                await Server.update(serverId, {mode: 'scheduled', constantly_update: true});

                const embed = {
                    color: '#ffe360',
                    author: {
                        name: 'RonaBot v2',
                        icon_url: config.discord.icon
                    },
                    title: `Using '${channelName}' for auto updates`,
                    description: `Set to scheduled mode, will run at ${time} each day. Turn off auto updates with \`/rb toggle off\``,
                    fields: []
                };
                await message.channel.send({embed: embed});

            } else if (mode === "") {
                await Server.update(serverId, {update_channel: channelId});
                const embed = {
                    color: '#ffe360',
                    author: {
                        name: 'RonaBot v2',
                        icon_url: config.discord.icon
                    },
                    title: `Using '${channelName}' for auto updates`,
                    description: 'Turn off auto updates with `/rb toggle off`',
                    fields: []
                }
            } else {

            }
            await message.channel.send({embed: embed});
        }

        init(mode, time);
    },
};
