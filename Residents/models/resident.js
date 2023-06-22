const mongoose = require("mongoose");
const db = require("./db");

const AddressSchema = new mongoose.Schema({
  subcity: String,
  woreda: String,
  houseNumber: String,
  phoneNumber: { type: String, require: true, minLength: 10, maxLength: 10 },
});

const ResidentSchema = new mongoose.Schema({
  name: { type: String, require: true },
  age: { type: Number, require: true, min: 0 },
  fatherName: { type: String, require: true },
  grandFatherName: { type: String, require: true },
  maritalStatus: { type: String, require: true },
  nationality: { type: String, require: true },
  dateOfBirth: { type: Date, require: true, default: Date.now },
  placeOfBirth: { type: String, require: true },
  sex: { type: String, require: true, enum: ["F", "M"] },
  address: { type: AddressSchema, require: true },
  educationLevel: {
    type: String,
    require: true,
    enum: [
      "uneducated",
      "college graduate",
      "undergraduate",
      "high school diploma",
    ],
  },
  occupation: { type: String, require: true },
  phoneNumber: { type: String, require: true, minLength: 10, maxLength: 10 },
  religion: { type: String, require: true },
  emergencyContact: {
    type: String,
    require: true,
    minLength: 10,
    maxLength: 10,
  },
  scheduleDate: {
    type: Date,
    require: true,
  },
});

const IdSchema = new mongoose.Schema({
  residentInfo: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Resident",
  },
  idNumber: String,
  registrationNumber: String,
  dateIssued: { type: Date, require: true, default: Date.now },
  expiryDate: { type: Date, require: true, default: Date.now },
});

const Resident = mongoose.model("Resident", ResidentSchema);
const Id = mongoose.model("Id", IdSchema);

module.exports = { Resident, Id };

// name: event.target.elements.name.value,
//       fatherName: event.target.elements.fname.value,
//       grandFatherName: event.target.elements.gname.value,
//       maritalStatus: event.target.elements.mstatus.value,
//       nationality: event.target.elements.nationality.value,
//       placeOfBirth: event.target.elements.pbirth.value,
//       address: event.target.elements.address.value,
//       sex: sexOption.label,
//       dateOfBirth: event.target.elements.bdate.value,
//       educationLevel: educationOption.label,
//       occupation: occupationOption.label,
//       religion: religionOption.label,
//       phoneNumber: event.target.elements.pnumber.value,
//       emergencyContact: event.target.elements.emcontact.value,
//       scheduledDate: date,
