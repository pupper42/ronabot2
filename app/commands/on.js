const config = require('../../app/config');
const Server = require('../controllers/server');

module.exports = {
    name: 'on',
    description: 'Turn on the bot alerts',
    execute(message) {
        // TODO: Link to services function to run updater/scraper to grab latest data from db
        // Also use args[0], args[1] to process the user input

        let serverId = message.guild.id;

        async function on() {
            await Server.update(serverId, {'constantly_update': true});
            const embed = {
                color: '#ffe360',
                author: {
                    name: 'RonaBot v2',
                    icon_url: 'https://i.imgur.com/rUakJmE.png'
                },
                fields: [
                    {name: 'Automatic Updates', value: `On. Use \`${config.discord.prefix} off\` to turn off`}
                ]
            };
            await message.channel.send({embed: embed});
        }

        on();
    },
};
