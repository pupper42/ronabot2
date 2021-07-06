const Server = require('../models/server');

/**
 * Create the server
 *
 * @returns {Promise<void>}
 * @param serverId
 * @param serverName
 */
exports.create = async function (serverId, serverName) {
    let defaultSettings = {
        name: serverName,
        server_id: serverId,
    }
    await Server.findOneAndUpdate({server_id: serverId}, defaultSettings, {new: true, upsert: true}, function (err, servers) {
        if (err) {
            console.log(err);
        } else {
            console.log(`New server added with ID ${servers.id}`);
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
 * Retrieve the servers
 *
 * @returns {Promise<void>}
 */
exports.getServers = async function () {
    try {
        return await Server.find({});
    } catch(e) {
        console.log("Error!: " + e);
    }
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
