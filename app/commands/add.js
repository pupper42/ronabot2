module.exports = {
    name: 'add',
    description: 'Add a location',
    execute(message, args) {
        // TODO: Link to services function to run updater/scraper to grab latest data from db
        // Also use args[0], args[1] to process the user input

        const embed = {
            color: '#ffe360',
            fields: [

            ]
        };
        message.channel.send({embed: embed});
    },
};
