const mongoose = require("mongoose");
const db = require("./db");

const AddressSchema = new mongoose.Schema({
  subcity: String,
  woreda: String,
  houseNumber: String,
  phoneNumber: { type: String, require: true, minLength: 10, maxLength: 10 },
});
const WitnessSchema = new mongoose.Schema({
  name: { type: String, require: true },
  idNumber: { type: String, require: true },
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
    enum: ["uneducated", "high-school", "college", "graduate"],
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
  witness: { type: WitnessSchema, require: true },
});

const IdSchema = new mongoose.Schema({
  personalInformation: {
    firstName: { type: String, require: true },
    middleName: { type: String, require: true },
    age: { type: Number, require: true },
    lastName: { type: String, require: true },
    nationality: { type: String, require: true },
    address: { type: String, require: true },
    religion: { type: String, require: true },
    martialStatus: {
      type: String,
      require: true,
      enum: ["married", "unmarried", "divorce"],
    },
    gender: { type: String, require: true, enum: ["male", "female"] },
    dateOfBirth: { type: Date, require: true },
  },
  idNumber: String,
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
