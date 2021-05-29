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

exports.getDoc = async function (serverId) {
    let locations = await Server.findOne({'server_id': serverId})
    return locations;
}
    
/**
 * Retrieve the servers
 *
 * @returns {Promise<void>}
 */
exports.getServers = async function () {
    await Server.find({}).exec(function (err, servers) {
        if (err) {
            console.log(err);
        } else {
            output = servers.map(function (server) {
               return server.name;
            });
            console.log(output);
        }
    });
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
