const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGO_URI
const db = "settings";
const collection = "servers"

const mClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

function scanArray(array, parameter) {
    var newArray = []
    for (i=0; i < array.length; i++) {
        newArray.push(array[i].parameter);
    }
    return newArray;
}

async function createServer(mClient, server) {
    const result = await mClient.db(db).collection(collection).insertOne(server);
    console.log(`New server added with id: ${result.insertedId}`);
}

async function readServers(mClient) {
    const cursor = await mClient.db(db).collection(collection).find({});
    const servers = await cursor.toArray();

    console.log(scanArray(servers, "name"))
}

async function updateServer(mClient, serverId, updateData) {
    const result = await mClient.db(db).collection(collection).updateOne(
        { "server_id": serverId }, 
        { $set: updateData },
        { upsert: true }
        );
        
    console.log(`Updated ${server_id} successfully`);

}

async function deleteServer(mClient, server) {

}

exports.crudService = async function(mode, serverId="0", updateData={}) {
    await mClient.connect()

    if (mode == "c") {

    }
    else if (mode == "r") {
        try {
            await readServers(mClient);    
        } catch(e) {    
            console.error(e);  
        }  
    }
    else if (mode == "u") {
        try {
            await updateServer(mClient, serverId, updateData);
        } catch(e) {
            console.error(e);
        }
    }
    else if (mode == "d") {

    }
    else {
        console.log("Please enter c, r, u or d!");
    }

    await mClient.close();  
}
