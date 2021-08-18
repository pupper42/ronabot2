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
        .setDescription('Set the channel to send updates in')
        .addSubcommand(subcommand =>
            subcommand
                .setName('repeating')
                .setDescription('Set the notification mode to `repeating`.')
                .addIntegerOption(option =>
                    option.setName('interval')
                        .setDescription('Set the interval between each notification in minutes.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('scheduled')
                .setDescription('Set the notification mode to `scheduled`.')
                .addStringOption(option =>
                    option.setName('time')
                        .setDescription('Set the interval between each notification in minutes.')
                        .setRequired(true))),
    async execute(interaction) {
        let serverId = interaction.guild.id;
        let channelId = interaction.channel.id;
        let channelName = interaction.channel.name;

        if (!PermissionsService.checkPermissions(interaction)) {
            return;
        }

        if (interaction.options.getSubcommand() === 'repeating') {
            try {
                let timeMin = interaction.options.getInteger('interval');

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
                        description: `Set to repeating mode, will send an update every ${timeMin} minutes. Turn off auto updates with \`/toggle off\``,
                    };

                    await interaction.reply({embeds: [MessagingService.getMessage('autoUpdates', fields)]});
                } else {
                    await interaction.reply({embeds: [MessagingService.getMessage('timeError')]});
                }
            } catch {
                await interaction.reply({embeds: [MessagingService.getMessage('timeError')]});
            }
        } else if (interaction.options.getSubcommand() === 'scheduled') {
            try {
                const time = interaction.options.getString('time');
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
                    description: `Set to scheduled mode, will run at ${time} each day. Turn off auto updates with \`/toggle off\``,
                };

                await interaction.reply({embeds: [MessagingService.getMessage('autoUpdates', fields)]});
            } catch {
                await interaction.reply({embeds: [MessagingService.getMessage('timeError24h')]});
            }
        }
    },
};
