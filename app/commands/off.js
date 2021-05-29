const config = require('../../app/config');
const Server = require('../controllers/server');

module.exports = {
    name: 'off',
    description: 'Turn off the bot alerts',
    execute(message) {
        // TODO: Link to services function to run updater/scraper to grab latest data from db
        // Also use args[0], args[1] to process the user input

        let serverId = message.guild.id;

        async function off() {
            await Server.update(serverId, {'constantly_update': false});
            const embed = {
                color: '#ffe360',
                fields: [
                    {name: 'Automatic Updates', value: `Off. Use \`${config.discord.prefix} off\` to turn on`}
                ]
            };
            await message.channel.send({embed: embed});
        }

        off();
    },
};
