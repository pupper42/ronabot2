const config = require('../config');
const axios = require('axios');
const cheerio = require('cheerio');
const _ = require('lodash');
const MessagingService = require('../services/messagingService');
const { SlashCommandBuilder } = require('@discordjs/builders');

/**
 * Gets general daily cases stats by country
 *
 * @type {{data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">, execute(*): Promise<void>}}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('country')
        .setDescription('Get daily cases stats by country')
        .addStringOption(option =>
            option.setName('country')
                .setDescription('Get country stats')
                .setRequired(true)),
    async execute (interaction) {
        // Constants
        let countryData = {};
        let country = interaction.options.getString('country');
        let countrySelector = "table.CASES-WORLDWIDE > tbody > tr";

        // Grab the website
        const website = await axios.get(config.sources.global);
        const $ = await cheerio.load(website.data);

        // Scrape the website for matching location
        $(countrySelector).each((index, element) => {
            if (index === 0) return true;
            let tds = $(element).find("td");

            // Check if country name matches user input
            let countryName = $(tds[0]).text();
            if (country === countryName) {
                let totalCases = $(tds[1]).text();
                let newCases = $(tds[3]).text();

                countryData = {totalCases, newCases};
            }
        });

        // No matching country found!
        if (_.isEmpty(countryData)) {
            await interaction.reply({embeds: [MessagingService.getMessage('invalidLocation')]});
        } else {
            const fields = {
                title: `Current report for ${country.toUpperCase()}`,
                fields: [
                    {name: 'Total cases', value: `${countryData.totalCases}`, inline: true},
                    {name: 'New cases', value: `${countryData.newCases}`, inline: true},
                    {name: '\u200b', value: '\u200b', inline: true},
                ]
            };

            await interaction.reply({embeds: [MessagingService.getMessage('locationStats', fields)]});
        }
    }
};
