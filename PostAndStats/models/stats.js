const mongoose = require('mongoose');

const StatSchema = new mongoose.Schema({
    category: {type: String, require: true},
    date: {type: Date, require: true, default: Date.now },
    totalNumberOfIssuesInCategory: {type: Number, require: true, default: 0}
});

module.exports = mongoose.model('Stat', StatSchema);