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
 * @param locationId
 * @param updateData
 * @returns {Promise<void>}
 */
 exports.update = async function (location, updateData) {
    await Statistic.findOneAndUpdate({'location': location}, updateData, {new: true, upsert: true}, function (err, location) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Updated ${location} successfully`);
        }
    });
}

/**
 * Delete the stats
 *
 * @returns {Promise<void>}
 * @param locationId
 */
exports.delete = async function(locationId) {

}
