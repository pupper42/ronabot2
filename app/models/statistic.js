const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Statistic = new Schema({
    new_cases: String,
    active_cases: String,
    total_cases: String,
    rolling_average: String,
    tests_conducted: String,
    updated_at: Date
});

module.exports = mongoose.model('Statistic', Statistic);