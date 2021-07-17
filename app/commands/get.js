const config = require('../config');
const scraper = require('../services/scraperService');
const urlService = require('../services/urlService');
const MessagingService = require('../services/messagingService');

/**
 * Get the statistics of a location
 *
 * @type {{name: string, description: string, execute(*, *): void}}
 */
module.exports = {
    name: 'get',
    description: 'Get stats for a location',
    execute(message, args) {
        // Also use args[0], args[1] to process the user input
        let location = args[0];
        let url = urlService.getUrl(location);

        if (!config.availableLocations.includes(location)) {
            message.channel.send({embed: MessagingService.getMessage('invalidLocation')});
            return
        }

        async function getData() {
            try {
                updateData = await scraper.getData(url, location);
            }
            catch {
                await message.channel.send({embed: MessagingService.getMessage('invalidLocation')});
                return
            }

            const fields = {
                title: `${updateData.last_updated} report for ${location.toUpperCase()}`,
                fields: [
                    {name: 'New local cases', value: updateData.new_lcases, inline: true},
                    {name: 'New overseas cases', value: updateData.new_ocases, inline: true},
                    {name: '\u200b', value: '\u200b', inline: true},
                    {name: 'Total local cases', value: updateData.total_lcases, inline: true},
                    {name: 'Total overseas cases', value: updateData.total_ocases, inline: true},
                    {name: '\u200b', value: '\u200b', inline: true},
                    {name: 'Active cases', value: updateData.active_cases, inline: true},
                    {name: 'Deaths', value: updateData.deaths, inline: true},
                    {name: '\u200b', value: '\u200b', inline: true},
                    {name: 'Tests', value: updateData.tests, inline: true},
                    {name: 'Vaccinations', value: updateData.vaccinations, inline: true},
                    {name: '\u200b', value: '\u200b', inline: true},
                ]
            };
            await message.channel.send({embed: MessagingService.getMessage('locationStats', fields)});
        }

        getData();
    },
};
