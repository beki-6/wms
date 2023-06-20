const mongoose = require('mongoose');
const db = require('./db');

const UserSchema = new mongoose.Schema({
    username: {type: String, require: true},
    phone: {type: String, require: true},
    password: {type: String, require: true, minLength: 8},
    token: {type: String}
});

module.exports = mongoose.model('User', UserSchema);