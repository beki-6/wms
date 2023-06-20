const mongoose = require('mongoose');
const db = require('./db');

const WeddingSchema = new mongoose.Schema({
    certificateNumber: {type: String, require: true},
    wifeResidentInfo: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Resident'},
    husbandResidentInfo: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Resident'},
    dateOfMarriage: {type: Date, require: true, default: Date.now },
    placeOfMarriageRegistration: {type: String, require: true},
    dateOfMarriageRegistration: {type: Date, require: true, default: Date.now},
    dateOfCertificateIssued: {type: Date, require: true, default: Date.now},
    nameOfCivilRegistrar: {type: String, require: true}
});

module.exports = mongoose.model('Wedding', WeddingSchema);