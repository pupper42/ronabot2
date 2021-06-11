const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Statistic = new Schema({
    location: String,
    new_lcases: String,
    new_ocases: String,
    active_cases: String,
    total_lases: String,
    total_ocases: String,
    tests: String,
    vaccinations: String,
    deaths: String,
    last_updated: String,
});

module.exports = mongoose.model('Statistic', Statistic);
