const mongoose = require('mongoose');
const db = require('./db');

const PostSchema = new mongoose.Schema({
    title: {type: String, require: true},
    topic: {type: String, require: true},
    body: {type: String, require: true},
    dateModified: {type: Date, require: true, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);