/**
 * Messaging Service
 *
 * Combines repeated static messages into one location
 */

const config = require('../config');
let messages;

class MessagingService {
    constructor() {
        // Set Messages
        this.setMessages();
    }

    /**
     * Set the Messages
     */
    setMessages() {
        messages = new Map([
            ['ardex', this.msgArdex()],
            ['roleError', this.msgRoleError()],
            ['invalidLocation', this.msgInvalidLocation()],
            ['addedLocation', this.msgAddedLocation()],
            ['removedLocation', this.msgRemovedLocation()],
            ['locationStats', this.msgLocationStats()],
            ['help', this.msgHelp()],
            ['autoUpdates', this.msgAutoUpdates()],
            ['timeError', this.msgTimeError()],
            ['timeError24h', this.msgTimeError24h()],
            ['invalidMode', this.msgInvalidMode()],
            ['status', this.msgStatus()],
            ['toggleError', this.msgToggleError()],
            ['toggleOn', this.msgToggleOn()],
            ['toggleOff', this.msgToggleOff()],
        ]);
    }

    /**
     * Get the message. If there are fields to be added, return those too!
     *
     * @param key
     * @param fields
     * @returns {*}
     */
    getMessage(key, fields) {
        if (fields) {
            let embed = messages.get(key);
            return Object.assign(embed, fields);
        }

        return messages.get(key);
    }

    msgArdex() {
        return {
            color: '#e31b23',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
            description: ':heart:'
        };
    }

    /**
     * Message: Insufficient Role
     *
     * @returns {{color: string, author: {icon_url: string, name: string}, description: string, title: string}}
     */
    msgRoleError() {
        return {
            title: "Error!",
            description: "You must be admin or have the Rona role!",
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
        };
    }

    msgInvalidLocation() {
        return {
            title: "Invalid Location!",
            description: "Please specify a location (vic, nsw, act, tas, qld, wa, nt, sa)",
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
        };
    }

    msgAddedLocation() {
        return {
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            }
        };
    }

    msgRemovedLocation() {
        return {
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            }
        };
    }

    msgLocationStats() {
        return {
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            }
        };
    }

    msgHelp() {
        const prefix = config.discord.prefix + ' ';

        return {
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
            title: 'Ronabot Commands',
            description: 'List of commands that Ronabot will accept!',
            fields: [
                {
                    name: 'QUICKSTART GUIDE',
                    value: `Do \`${prefix} + add\` to add the locations you want automatic updates for. Then do \`${prefix} + init [repeating/scheduled] [time]\` to configure autmoatic updates. See below for more details`,
                },
                {
                    name: prefix + 'status',
                    value: 'Show the current status and settings for the server',
                },
                {
                    name: prefix + 'get [location]',
                    value: 'Return a single location\'s statistics. Current available locations are: `vic, nsw, qld, wa, sa, tas, nt, act`',
                },
                {
                    name: prefix + 'add [location]',
                    value: 'Add a location to provide automatic updates for. Current available locations are: `vic, nsw, qld, wa, sa, tas, nt, act`',
                },
                {
                    name: prefix + 'remove [location]',
                    value: 'Remove a location to provide automatic updates for'
                },
                {
                    name: prefix + 'init [repeating/scheduled] [time]',
                    value: 'Use the current channel for automatic updates and choose auto update mode. Choose repeating if you want the bot to send updates according to a time interval (in minutes). Choose scheduled if you want the bot to send an update at a specific time of the day (in 24h time without the colons like 0930 or 1554). Use `/rb toggle off` if you want to stop receiving auto updates',
                },
                {
                    name: prefix + 'toggle [on/off]',
                    value: 'Toggle on or off auto updates for the server',
                },
                {
                    name: prefix + 'help',
                    value: 'Well you\'re looking at it right now, aren\'t you?',
                },
            ]
        };
    }

    msgAutoUpdates() {
        return {
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            }
        };
    }

    msgTimeError() {
        return {
            title: "Error!",
            description: "Please enter a number between 1 and 4320!",
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
        };
    }

    msgTimeError24h() {
        return {
            title: "Error!",
            description: "Please enter a 24h time!",
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
        };
    }

    msgInvalidMode() {
        return {
            title: "Error!",
            description: "Please enter scheduled or repeating!",
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
        };
    }

    msgStatus() {
        return {
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
            title: `Current Status & Settings`
        };
    }

    msgToggleError() {
        return {
            title: "Error!",
            description: "Please specify on or off",
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
        };
    }

    msgToggleOn() {
        return {
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
            title: 'Automatic updates turned on',
            description: `Use \`${config.discord.prefix} toggle off\` to turn it back off`,
        };
    }

    msgToggleOff() {
        return {
            color: '#ffe360',
            author: {
                name: 'RonaBot v2',
                icon_url: config.discord.icon
            },
            title: 'Automatic updates turned off',
            description: `Use \`${config.discord.prefix} toggle on\` to turn it back on`,
            fields: []
        };
    }
}


module.exports = new MessagingService();
