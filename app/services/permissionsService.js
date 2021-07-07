exports.checkPermissions = function(message) {
    if (!(message.member.hasPermission("ADMINISTRATOR") || message.member.roles.cache.some(r => r.name === "Rona"))) {
        const errorEmbed = {
            title: "Error!",
            description: "You must be admin or have the Rona role!",
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
        };

        message.channel.send({embed: errorEmbed});
    }
}
