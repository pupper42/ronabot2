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

        /**
         * Global Cases
         */
        const globalCases = await axios.get(config.globalSources.cases);
        const globalCasesData = await cheerio.load(globalCases.data);

        // Scrape the website for matching location
        globalCasesData(countrySelector).each((index, element) => {
            if (index === 0) return true;
            let tds = globalCasesData(element).find("td");

            // Check if country name matches user input
            let countryName = globalCasesData(tds[0]).text();
            if (country === countryName) {
                let totalCases = globalCasesData(tds[1]).text();
                let newCases = globalCasesData(tds[3]).text();

                countryData = {totalCases, newCases};
            }
        });

        /**
         * Global Vaccinations
         */
        const globalVaccinations = await axios.get(config.globalSources.vaccinations);
        const globalVaccinationsData = await cheerio.load(globalVaccinations.data);

        // Scrape the website for matching location
        globalVaccinationsData(countrySelector).each((index, element) => {
            if (index === 0) return true;
            let tds = globalVaccinationsData(element).find("td");

            // Check if country name matches user input
            let countryName = globalVaccinationsData(tds[0]).text();
            if (country === countryName) {
                countryData['firstDose'] = globalVaccinationsData(tds[2]).text();
                countryData['secondDose'] = globalVaccinationsData(tds[3]).text();
            }
        });

        // No matching country found!
        if (_.isEmpty(countryData)) {
            await interaction.reply({embeds: [MessagingService.getMessage('invalidLocation')]});
        } else {
            const fields = {
                title: `COVID-19 Stats for ${country.toUpperCase()} (Country)`,
                fields: [
                    {name: 'Total cases', value: `${countryData.totalCases}`, inline: true},
                    {name: 'New cases', value: `${countryData.newCases}`, inline: true},
                    {name: '\u200b', value: '\u200b', inline: true},
                    {name: 'First Dose', value: `${countryData.firstDose}`, inline: true},
                    {name: 'Second Dose', value: `${countryData.secondDose}`, inline: true},
                    {name: '\u200b', value: '\u200b', inline: true},
                ]
            };

            await interaction.reply({embeds: [MessagingService.getMessage('locationStats', fields)]});
        }
    }
};
