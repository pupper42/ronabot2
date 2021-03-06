const config = require('../config');
const scraper = require('../services/scraperService');
const urlService = require('../services/urlService');
const MessagingService = require('../services/messagingService');
const {SlashCommandBuilder} = require("@discordjs/builders");

/**
 * Get the statistics of a location
 *
 * @type {{name: string, description: string, execute(*, *): void}}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('get')
        .setDescription('Get stats for a location')
        .addStringOption(option =>
            option.setName('location')
                .setDescription('Get statistics for a specified location.')
                .setRequired(true)),
    async execute(interaction) {
        let location = interaction.options.getString('location');
        let url = urlService.getUrl(location);

        if (!config.availableLocations.includes(location)) {
            await interaction.reply({embeds: [MessagingService.getMessage('invalidLocation')]});
            return
        }

        try {
            updateData = await scraper.getData(url, location);
        }
        catch {
            await interaction.reply({embeds: [MessagingService.getMessage('failedUpdate')]});
            return
        }

        const fields = {
            title: `${updateData.last_updated} report for ${location.toUpperCase()}`,
            fields: [
                {name: 'New cases', value: `${updateData.new_cases}`, inline: true},
                {name: '7 Day Case Average', value: `${updateData.case_av}`, inline: true},
                {name: '\u200b', value: '\u200b', inline: true},
                {name: 'Total cases', value: `${updateData.total_cases}`, inline: true},
                {name: 'Active cases', value: `${updateData.active_cases}`, inline: true},
                {name: '\u200b', value: '\u200b', inline: true},
                {name: 'Tests', value: `${updateData.tests}`, inline: true},
                {name: 'Deaths', value: `${updateData.deaths}`, inline: true},
                {name: '\u200b', value: '\u200b', inline: true},
                {name: 'First Dose', value: `${updateData.f_dose}`, inline: true},
                {name: 'Second Dose', value: `${updateData.s_dose}`, inline: true},
                {name: '\u200b', value: '\u200b', inline: true},
                {name: 'Third Dose', value: `${updateData.t_dose}`, inline: true},
                {name: '\u200b', value: '\u200b', inline: true},
]
        };
        await interaction.reply({embeds: [MessagingService.getMessage('locationStats', fields)]});
    },
};
