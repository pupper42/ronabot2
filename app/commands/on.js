const config = require('../../app/config');
const Server = require('../controllers/server');

/**
 * Enable the bot to use automatic notification updates
 *
 * @type {{name: string, description: string, execute(*): void}}
 */
module.exports = {
    name: 'on',
    description: 'Turn on the bot alerts',
    execute(message) {
        let serverId = message.guild.id;

        async function on() {
            await Server.update(serverId, {'constantly_update': true});
            const embed = {
                color: '#ffe360',
                author: {
                    name: 'RonaBot v2',
                    icon_url: config.discord.icon
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
