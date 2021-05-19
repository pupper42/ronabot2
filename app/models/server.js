const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Server = new Schema({
    name: String,
    server_id: String,
    vic: Boolean,
    nsw: Boolean,
    qld: Boolean,
    act: Boolean,
    sa: Boolean,
    wa: Boolean,
    nt: Boolean,
    updateData: Object,
    constantly_update: Boolean
});

module.exports = mongoose.model('Server', Server);
