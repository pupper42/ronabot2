const config = require('../config/');
const scraper = require('../services/scraperService');
const Server = require('../controllers/server');

module.exports = {
    name: 'get',
    description: 'Get stats for a location',
    execute(message, args) {
        // TODO: Link to services function to run updater/scraper to grab latest data from db
        // Also use args[0], args[1] to process the user input
        
        let location = args[0];
        let url;

        switch(location) {
            case 'vic':
                url = config.vicSource;
                break;
            case 'nsw':
                url = config.nswSource;
                break;
            case 'qld':
                url = config.qldSource;
                break;
            case 'wa':
                url = config.waSource;
                break;
            case 'sa':
                url = config.saSource;
                break;
            case 'tas':
                url = config.tasSource;
                break;
            case 'nt':
                url = config.ntSource;
                break;
            case 'act':
                url = config.actSource;
                break;
            default:
                break;
        }

        async function getData() {
            try {
                updateData = await scraper.getData(url, location);
            }
            catch {
                message.reply("please enter a valid location!")
            }
            

            const embed = {
                color: '#ffe360',
                author: {
                    name: 'RonaBot v2',
                    icon_url: 'https://i.imgur.com/2ojyW5z.png'
                },
                title: `Report for ${location.toUpperCase()}`,
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
            message.channel.send({embed: embed});
        }

        getData();

        
    },
};
