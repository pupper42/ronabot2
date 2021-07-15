const config = require('../config');


exports.getUrl = function(location) {

    let url;

    try {
        url = config.sources[location];
    } catch (e) {
        switch(location) {
            case 'vic':
                url = config.sources.vic;
                break;
            case 'nsw':
                url = config.sources.nsw;
                break;
            case 'qld':
                url = config.sources.qld;
                break;
            case 'wa':
                url = config.sources.wa;
                break;
            case 'sa':
                url = config.sources.sa;
                break;
            case 'tas':
                url = config.sources.tas;
                break;
            case 'nt':
                url = config.sources.nt;
                break;
            case 'act':
                url = config.sources.act;
                break;
            default:
                break;
        }
    }

    return url;
}
