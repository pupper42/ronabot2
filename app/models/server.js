const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Server = new Schema({
    name: String,
    server_id: Number,
    location: String,
    updateData: Object,
    constantly_update: Boolean,
    update_interval: Number,
    updated_at: Date
});

module.exports = mongoose.model('Server', Server);
