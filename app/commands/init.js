const config = require('../config');
const Server = require('../controllers/server');
const PermissionsService = require('../services/permissionsService');
const MessagingService = require('../services/messagingService');
const { DateTime } = require("luxon");
const { SlashCommandBuilder } = require('@discordjs/builders');


/**
 * Inits the bot to a specific channel to output messages to
 *
 * @type {{name: string, description: string, execute(*): void}}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('init')
        .setDescription('Set the channel to send updates in'),
    async execute(interaction, args) {
        let serverId = interaction.guild.id;
        let channelId = interaction.channel.id;
        let channelName = interaction.channel.name;
        let mode = args[0];
        let time = args[1];

        if (!PermissionsService.checkPermissions(interaction)) {
            return;
        }

        if (mode === 'repeating') {
            try {
                let timeMin = parseInt(time);

                if (timeMin >=1 && timeMin <= 4320) {
                    await Server.update(serverId,
                        {
                            constantly_update: true,
                            update_channel: channelId,
                            update_interval: timeMin,
                            updated_at: DateTime.now().plus({ minutes: timeMin }).toISO(),
                            mode: 'repeating',
                        }
                    );

                    const fields = {
                        title: `Using '${channelName}' for auto updates`,
                        description: `Set to repeating mode, will send an update every ${time} minutes. Turn off auto updates with \`/rb toggle off\``,
                    };

                    await interaction.reply({embed: MessagingService.getMessage('autoUpdates', fields)});
                } else {
                    await interaction.reply({embed: MessagingService.getMessage('timeError')});
                }
            } catch {
                await interaction.reply({embed: MessagingService.getMessage('timeError')});
            }
        } else if (mode === 'scheduled') {
            try {
                let timeDay = DateTime.fromFormat(time, 'H:mm');
                let currentTime = DateTime.now();

                console.log(`init.js - timeDay: ${timeDay}, currentTime: ${currentTime}`);

                await Server.update(serverId,
                    {
                        update_channel: channelId,
                        updated_at: timeDay.toISO(),
                        mode: 'scheduled',
                        constantly_update: true
                    }
                );

                const fields = {
                    title: `Using '${channelName}' for auto updates`,
                    description: `Set to scheduled mode, will run at ${time} each day. Turn off auto updates with \`/rb toggle off\``,
                };

                await interaction.reply({embed: MessagingService.getMessage('autoUpdates', fields)});
            } catch {
                await interaction.reply({embed: MessagingService.getMessage('timeError24h')});
            }
        } else if (mode === '') {
            await Server.update(serverId, {update_channel: channelId});

            const fields = {
                title: `Using '${channelName}' for auto updates`,
                description: 'Turn off auto updates with `'+config.discord.prefix+' toggle off`',
            }

            await interaction.reply({embed: MessagingService.getMessage('autoUpdates', fields)});
        } else {
            await interaction.reply({embed: MessagingService.getMessage('invalidMode')});
        }
    },
};
