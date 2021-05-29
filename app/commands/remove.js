const Server = require('../controllers/server');

module.exports = {
    name: 'remove',
    description: 'Remove a location',
    execute(message, args) {
        let serverId = message.guild.id;
        let location = args[0];

        async function deleteLocation() {
            try {
                await Server.removeLocation(serverId, location);
                const embed = {
                    color: '#ffe360',
                    fields: [
                        {name: 'Removed', value: location}
                    ]
                };
                message.channel.send({embed: embed});
            } catch(e) {
                console.log(e);
            }
        }

        deleteLocation();
    },
};
