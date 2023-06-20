const mongoose = require('mongoose');
const db = require('./db');

const AddressSchema = new mongoose.Schema({
    subcity: String,
    woreda: String,
    houseNumber: String,
    phoneNumber: {type: String, require: true, minLength: 10, maxLength: 10}
});

const ResidentSchema = new mongoose.Schema({
    name: {type: String, require: true},
    age: {type: Number, require: true, min: 0},
    fatherName: {type: String, require: true},
    grandFatherName: {type: String, require: true},
    maritalStatus: {type: String, require: true},
    nationality: {type: String, require: true},
    dateOfBirth: {type: Date, require: true, default: Date.now },
    placeOfBirth: {type: String, require: true},
    sex: {type: String, require: true, enum: ['F', 'M']},
    address: {type: AddressSchema, require: true},
    educationLevel: {type: String, require: true, enum: ['uneducated', 'college graduate', 'undergraduate', 'high school diploma']},
    occupation: {type: String, require: true},
    race: {type: String, require: true},
    phoneNumber: {type: String, require: true, minLength: 10, maxLength: 10},
    religion: {type: String, require: true, },
    emergencyContact: {type: String, require: true, minLength: 10, maxLength: 10 }
});

const IdSchema = new mongoose.Schema({
    residentInfo: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Resident'},
    idNumber: String,
    registrationNumber: String,
    dateIssued: {type: Date, require: true, default: Date.now },
    expiryDate: {type: Date, require: true, default: Date.now }
});

const Resident = mongoose.model('Resident', ResidentSchema);
const Id = mongoose.model('Id', IdSchema);

module.exports = {Resident, Id};