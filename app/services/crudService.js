// TODO: Fix this (Technically this should be the Bot command handler)

const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
const uri = config.databaseURL;
const db = "settings";
const collection = "servers"
const mClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

class CrudService {
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

module.exports = CrudService;
