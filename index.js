require('dotenv').config();

const Discord = require('discord.js');
const cheerio = require("cheerio");
const MongoClient = require('mongodb').MongoClient;

const dataSource = "https://covidlive.com.au/";
const dbUrl = "mongodb+srv://pupper42:EuNjssHbjXKMXU1w@cluster0.wvyjp.mongodb.net/ronabot2?retryWrites=true&w=majority"

const mClient = new MongoClient(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const client = new Discord.Client();

async function listServers(mClient) {
    const cursor = await mClient.db("settings").collection("servers").find()
    const servers = await cursor.toArray();

    console.log("Servers:" + servers);
}

async function addServer(mClient, server) {
    const result = await mClient.db("settings").collection("servers").insertOne(server);
    console.log(`New server added with id: ${result.insertedId}`);
}

async function crudService(mode) {
    if (mode == "c") {

    }
    else if (mode == "r") {
        try {

            await mClient.connect();
            await listServers(mClient);
    
        } catch(e) {
    
            console.error(e);
    
        } finally {
    
            await mClient.close();
    
        }
    }
    else if (mode == "u") {

    }
    else if (mode == "d") {

    }
    else {
        console.log("Please enter c, r, u or d!");
    }  
}

crudService("r").catch(console.error);


client.on('ready', () => {

});