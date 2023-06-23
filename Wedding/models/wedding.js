const mongoose = require('mongoose');
const db = require('./db');

const WeddingSchema = new mongoose.Schema({
    wifeResidentInfo: {
        firstName: { type: String, require: true },
        lastName: { type: String, require: true },
        address: { type: String, require: true },
        phone: { type: String, require: true },
        age: {type: Number, require: true}
    },
    husbandResidentInfo: {
        firstName: { type: String, require: true },
        lastName: { type: String, require: true },
        address: { type: String, require: true },
        phone: { type: String, require: true },
        age: {type: Number, require: true}
    },
    dateOfMarriage: {type: Date, require: true, default: Date.now },
    placeOfMarriage: {type: String, require: true}
});

module.exports = mongoose.model('Wedding', WeddingSchema);