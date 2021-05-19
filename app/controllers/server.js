const Server = require('../models/server');

/**
 * Scan the array
 *
 * @param array
 * @param parameter
 * @returns {*[]}
 */
function scanArray(array, parameter) {
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
 * Retrieve the servers
 *
 * @returns {Promise<void>}
 */
exports.read = async function () {
    await Server.find({}).exec(function (err, servers) {
        if (err) {
            console.log(err);
        } else {
            console.log(scanArray(servers, "name"))
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
