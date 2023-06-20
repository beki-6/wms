const mongoose = require('mongoose');
const db = require('./db');

const ScheduleSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, require: true},
    date: {type: Date, require: true, default: Date.now },
    partOfDay: {type: String, require: true, enum: ['Morning', 'Afternoon']}
});

module.exports = mongoose.model('Schedule', ScheduleSchema);