const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI
const db = "settings";
const collection = "servers"
const mClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

class mongoFunctions {
    /**
     * Scan the array
     *
     * @param array
     * @param parameter
     * @returns {*[]}
     */
    scanArray(array, parameter) {
        let newArray = []
        let i;

        for (i=0; i < array.length; i++) {
            newArray.push(array[i].parameter);
        }
        return newArray;
    }

    /**
     * Create the server
     *
     * @param mClient
     * @param server
     * @returns {Promise<void>}
     */
    async createServer(mClient, server) {
        const result = await mClient.db(db).collection(collection).insertOne(server);
        console.log(`New server added with id: ${result.insertedId}`);
    }

    /**
     * Read the server
     *
     * @param mClient
     * @returns {Promise<void>}
     */
    async readServers(mClient) {
        const cursor = await mClient.db(db).collection(collection).find({});
        const servers = await cursor.toArray();

        console.log(this.scanArray(servers, "name"))
    }

    /**
     * Updates the server
     *
     * @param mClient
     * @param serverId
     * @param updateData
     * @returns {Promise<void>}
     */
    async updateServer(mClient, serverId, updateData) {
        const result = await mClient.db(db).collection(collection).updateOne(
            { "server_id": serverId },
            { $set: updateData },
            { upsert: true }
        );

        console.log(`Updated ${serverId} successfully`);
    }

    /**
     * Deletes the server
     *
     * @param mClient
     * @param server
     * @returns {Promise<void>}
     */
    async deleteServer(mClient, server) {

    }

    /**
     * Initialise the CRUD service
     *
     * @param mode
     * @param serverId
     * @param updateData
     * @returns {Promise<void>}
     */
    async crudService(mode, serverId="0", updateData={}) {
        await mClient.connect()

        switch(mode) {
            case "c":
                break;
            case "r":
                try {
                    await this.readServers(mClient);
                } catch(e) {
                    console.error(e);
                }
                break;
            case "u":
                try {
                    await this.updateServer(mClient, serverId, updateData);
                } catch(e) {
                    console.error(e);
                }
                break;
            case "d":
                break;
            default:
                console.log("Please enter c, r, u or d!");
                break;
        }

        await mClient.close();
    }
}

// Export the function
module.exports = mongoFunctions;
