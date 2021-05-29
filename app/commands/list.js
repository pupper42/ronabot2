const Server = require('../controllers/server');

module.exports = {
    name: 'list',
    description: 'List locations added by a server',
    execute(message, args) {
        // TODO: Link to services function to run updater/scraper to grab latest data from db
        // Also use args[0], args[1] to process the user input
        let serverId = message.guild.id;

        async function sendLocations() {
            let doc = await Server.getDoc(serverId);
            const embed = {
                color: '#ffe360',
                fields: [
                    {name: 'Locations added:', value: doc.location}
                ]
            };
            message.channel.send({embed: embed});          
        }

        sendLocations();
    },
};
