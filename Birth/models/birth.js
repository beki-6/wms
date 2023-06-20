const mongoose = require('mongoose');
const db = require('./db');

const BirthSchema = new mongoose.Schema({
    nameOfChild: {type: String, require: true},
    sex: {type: String, require: true, enum: ['F', 'M']},
    dateOfBirth: {type: Date, require: true, default: Date.now },
    placeOfBirth: {type: String, require: true},
    deliveryMethod: {type: String, require: true},
    nationality: {type: String, require: true},
    weight: {type: Number, require: true, min: 0},
    attendantProfessional: {type: String, require: true},
    motherResidentInfo: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Resident'},
    fatherResidentInfo: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Resident'}
});

module.exports = mongoose.model('Birth', BirthSchema)