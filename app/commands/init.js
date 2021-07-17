const Server = require('../controllers/server');
const MessagingService = require('../services/messagingService');

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
            message.channel.send({embed: MessagingService.getMessage('roleError')});
            return
        }

        async function init(mode, time) {
            if (mode === 'repeating') {
                try {
                    let timeMin = parseFloat(time);

                    if (timeMin >=1 && timeMin <= 4320) {
                        await Server.update(serverId,
                            {
                                update_interval: timeMin,
                                update_channel: channelId,
                                mode: 'repeating',
                                constantly_update: true
                            }
                        );

                        const fields = {
                            title: `Using '${channelName}' for auto updates`,
                            description: `Set to repeating mode, will send an update every ${time} minutes. Turn off auto updates with \`/rb toggle off\``,
                        };

                        await message.channel.send({embed: MessagingService.getMessage('autoUpdates', fields)});
                    } else {
                        await message.channel.send({embed: MessagingService.getMessage('timeError')});
                    }
                } catch {
                    await message.channel.send({embed: MessagingService.getMessage('timeError')});
                }

            } else if (mode === 'scheduled') {
                try {
                    let timeDay = parseInt(time);

                    if (timeDay) {
                        await Server.update(serverId,
                            {
                                update_channel: channelId,
                                updated_at: timeDay,
                                mode: 'scheduled',
                                update_interval: 1440,
                                constantly_update: true
                            }
                        );

                        const fields = {
                            title: `Using '${channelName}' for auto updates`,
                            description: `Set to scheduled mode, will run at ${time} each day. Turn off auto updates with \`/rb toggle off\``,
                        };

                        await message.channel.send({embed: MessagingService.getMessage('autoUpdates', fields)});
                    } else {
                        await message.channel.send({embed: MessagingService.getMessage('timeError24h')});
                    }
                } catch {
                    await message.channel.send({embed: MessagingService.getMessage('timeError24h')});
                }
            } else if (mode === "") {
                await Server.update(serverId, {update_channel: channelId});

                const fields = {
                    title: `Using '${channelName}' for auto updates`,
                    description: 'Turn off auto updates with `/rb toggle off`',
                }

                await message.channel.send({embed: MessagingService.getMessage('autoUpdates', fields)});
            } else {
                await message.channel.send({embed: MessagingService.getMessage('invalidMode')});
            }
        }

        init(mode, time);
    },
};
