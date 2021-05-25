const Server = require('../controllers/server');

module.exports = {
    name: 'add',
    description: 'Add a location',
    execute(message, args) {
        // TODO: Link to services function to run updater/scraper to grab latest data from db
        // Also use args[0], args[1] to process the user input
        messageServer = message.guild.id; 
        newLocation = args.join(" ");
        
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
