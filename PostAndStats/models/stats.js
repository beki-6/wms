const mongoose = require('mongoose');
const db = require('./db');

const StatSchema = new mongoose.Schema({
    category: {type: String, require: true},
    date: {type: Date, require: true, default: Date.now },
    totalNumberOfIssuesInCategory: {type: Number, require: true}
});

module.exports = mongoose.model('Stat', StatSchema);