const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Statistic = new Schema({
    location: String,
    new_cases: Number,
    case_change: Number,
    active_cases: Number,
    total_cases: Number,
    rolling_average: String,
    tests_conducted: Number,
    vaccinations: Number,
    deaths: Number,
    tests: Number,
    updated_at: Date,
});

module.exports = mongoose.model('Statistic', Statistic);
