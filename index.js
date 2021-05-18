require('dotenv').config();

const mfx = require('./mongoFunctions.js');
const Discord = require('discord.js');
const cheerio = require("cheerio");

const dataSource = "https://covidlive.com.au/";

const client = new Discord.Client();

const defaultSettings = {
    vic: false,
    nsw: false,
    qld: false,
    act: false,
    sa: false,
    wa: false,
    nt: false,
    constantly_update: false
}

mfx.crudService("r").catch(console.error);
mfx.crudService(mode="u", server_id="381685383827554316", updateData={vic: false});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.guilds.cache.forEach(guild => {
        console.log(`${guild.name} | ${guild.id}`);
    });
});

client.login(process.env.DISCORD_TOKEN);
