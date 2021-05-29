const Server = require('../controllers/server');

module.exports = {
    name: 'remove',
    description: 'Remove a location',
    execute(message, args) {
        // TODO: Link to services function to run updater/scraper to grab latest data from db
        // Also use args[0], args[1] to process the user input
        let serverId = message.guild.id;
        
        const embed = {
            color: '#ffe360',
            fields: [

            ]
        };
        message.channel.send({embed: embed});
    },
};
