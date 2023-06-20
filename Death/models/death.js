const mongoose = require('mongoose');
const db = require('./db');

const DeathSchema = new mongoose.Schema({
    deceasedResidentInfo: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Resident'},
    dateOfDeath: {type: Date, require: true, default: Date.now },
    placeOfDeath: {type: String, require: true},
    dateOfCertificateIssued: {type: Date, require: true, default: Date.now},
    dateOfDeathRegistration: {type: Date, require: true, default: Date.now},
    nameOfCivilRegistrar: {type: String, require: true},
    certificateNumber: {type: String, require: true}
});

module.exports = mongoose.model('Death', DeathSchema);