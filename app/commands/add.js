const Server = require('../controllers/server');

module.exports = {
    name: 'add',
    description: 'Add a location',
    execute(message, args) {
        let messageServer = message.guild.id;
        let newLocation = args.join(" ");

        // Create or add the location
        Server.update(messageServer, {$push: {location: [newLocation]}});

        const embed = {
            color: '#ffe360',
            fields: [
                {name: 'Added new location:', value: newLocation}
            ]
        };
        message.channel.send({embed: embed});
    },
};
