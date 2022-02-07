const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Statistic = new Schema({
    location: String,
    new_cases: String,
    case_av: String,
    total_cases: String,
    active_cases: String,
    tests: String,
    deaths: String,
    f_dose: String,
    s_dose: String,
    t_dose: String,
});

module.exports = mongoose.model('Statistic', Statistic);
