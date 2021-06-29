const Server = require('../controllers/server');

/**
 * Adds a (discord) server to the database
 *
 * @type {{name: string, description: string, execute(*): void}}
 */
module.exports = {
    name: 'addserver',
    description: 'Initialise the db for all server',
    execute(message) {
        const serverId = message.guild.id;
        const serverName = message.guild.name;

        async function addserver() {
            await Server.create(serverId, serverName);
            const embed = {
                color: '#ffe360',
                fields: [
                    {name: `Server added to database`, value: ":eyes:"}
                ]
            };
            await message.channel.send({embed: embed});
        }

        addserver();
    },
};
