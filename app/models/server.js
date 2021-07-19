const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Server = new Schema({
    name: String,
    server_id: String,
    location: Array,
    updateData: Object,
    constantly_update: Boolean,
    mode: String,
    update_interval: Number,
    update_time: Number,
    updated_at: Date,
    update_channel: String,
});

module.exports = mongoose.model('Server', Server);
