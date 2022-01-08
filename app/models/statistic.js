const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Statistic = new Schema({
    location: String,
    new_lcases: String,
    new_ocases: String,
    active_cases: String,
    total_lcases: String,
    total_ocases: String,
    tests: String,
    vaccinations: String,
    deaths: String,
    last_updated: String,
    f_dose: String,
    s_dose: String
});

module.exports = mongoose.model('Statistic', Statistic);
