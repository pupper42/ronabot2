const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Statistic = new Schema({
    location: String,
    new_lcases: Number,
    new_ocases: Number,
    active_cases: Number,
    total_lases: Number,
    total_ocases: Number,
    tests: Number,
    vaccinations: Number,
    deaths: Number,
    last_updated: Date,
});

module.exports = mongoose.model('Statistic', Statistic);
