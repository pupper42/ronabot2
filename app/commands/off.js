const config = require('../../app/config');
const Server = require('../controllers/server');

/**
 * Disnable the bot to use automatic notification updates
 *
 * @type {{name: string, description: string, execute(*): void}}
 */
module.exports = {
    name: 'off',
    description: 'Turn off the bot alerts',
    execute(message) {
        let serverId = message.guild.id;

        async function off() {
            await Server.update(serverId, {'constantly_update': false});
            const embed = {
                color: '#ffe360',
                author: {
                    name: 'RonaBot v2',
                    icon_url: config.discord.icon
                },
                fields: [
                    {name: 'Automatic Updates', value: `Off. Use \`${config.discord.prefix} on\` to turn on`}
                ]
            };
            await message.channel.send({embed: embed});
        }

        off();
    },
};
