const Statistic = require('../models/statistic');

/**
 * Create the stats
 *
 * @returns {Promise<void>}
 * @param statistic
 */
exports.create = async function (statistic) {

}

/**
 * Retrieve the stats
 *
 * @returns {Promise<void>}
 */
exports.read = async function (location) {
    try {
        return await Statistic.findOne({'location': location});
    } catch(e) {
        console.log("Error!: " + e);
    }
}

/**
 * Updates the stats
 *
 * @param location
 * @param updateData
 * @returns {Promise<void>}
 */
 exports.update = async function (location, updateData) {
    await Statistic.findOneAndUpdate({location: location}, updateData, {new: true, upsert: true}, function (err, location) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Updated ${location.location} successfully`);
        }
    });
}

/**
 * Delete the stats
 *
 * @returns {Promise<void>}
 * @param location
 */
exports.delete = async function(location) {
    await Statistic.findOneAndDelete({location: location}, function (err, statistic) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Deleted ${statistic} successfully`);
        }
    });
}

/**
 * Retrieve all statistics
 */
exports.all = async function() {
    try {
        let stats = await Statistic.find({});
        return stats.map(function (server) {
            return server.location;
        });
    } catch(e) {
        console.log("Error!: " + e);
    }
}
