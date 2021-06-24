const config = require('../config');

// TODO: Rewrite this into less hardcodey stuff (check location exists in database)
exports.getUrl = function(location) {

    let url;

    switch(location) {
        case 'vic':
            url = config.vicSource;
            break;
        case 'nsw':
            url = config.nswSource;
            break;
        case 'qld':
            url = config.qldSource;
            break;
        case 'wa':
            url = config.waSource;
            break;
        case 'sa':
            url = config.saSource;
            break;
        case 'tas':
            url = config.tasSource;
            break;
        case 'nt':
            url = config.ntSource;
            break;
        case 'act':
            url = config.actSource;
            break;
        default:
            break;
    }

    return url;
}
