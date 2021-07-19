/**
 * URL Service
 *
 * Returns the source websites for COVID data
 */

const config = require('../config');

exports.getUrl = function(location) {

    let url = '';

    if (config.availableLocations.includes(location)) {
        url = config.sources[location];
    }

    return url;
}
