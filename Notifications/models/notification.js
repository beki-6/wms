const mongoose = require('mongoose');
const db = require('./db');

const NotificationSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, require: true},
    body: {type: String, require: true},
    date: {type: Date, require: true, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema)