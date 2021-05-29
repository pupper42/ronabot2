const Server = require('../models/server');

/**
 * Create the server
 *
 * @returns {Promise<void>}
 * @param server
 */
exports.create = async function (server) {
    let newServer = new Server(server);
    await newServer.save(function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(`New server added with id: ${doc.id}`);
        }
    });
}

/**
 * Retrieve a document based on server ID
 *
 * @returns {Promise<void>}
 */
exports.getDoc = async function (serverId) {
    try {
        return await Server.findOne({server_id: serverId});
    } catch(e) {
        console.log("Error!: " + e);
    }
}

/**
 * Remove a location from a server
 *
 * @param serverId
 * @param location
 * @returns {Promise<void>}
 */
exports.removeLocation = async function (serverId, location) {
    try {
        await Server.findOneAndUpdate({server_id: serverId}, { $pull: {'location': location}}, {'new': true});
    } catch(e) {
        console.log("Error!: " + e);
    }
}

/**
 * Retrieve the servers
 *
 * @returns {Promise<void>}
 */
exports.getServers = async function () {
    try {
        let docs = await Server.find({});
        return docs.map(function (server) {
            return server.name;
        });
    } catch(e) {
        console.log("Error!: " + e);
    }
}

/**
 * Updates the Servers
 *
 * @param serverId
 * @param updateData
 * @returns {Promise<void>}
 */
exports.update = async function (serverId, updateData) {
    await Server.findOneAndUpdate({server_id: serverId}, updateData, {new: true, upsert: true}, function (err, servers) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Updated ${servers.id} successfully`);
        }
    });
}

/**
 * Delete the server
 *
 * @param serverId
 * @returns {Promise<void>}
 */
exports.delete = async function(serverId) {
    await Server.findOneAndDelete({server_id: serverId}, function (err, servers) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Deleted ${servers.id} successfully`);
        }
    });
}
