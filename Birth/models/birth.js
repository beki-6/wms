const mongoose = require("mongoose");
const db = require("./db");

const BirthSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  middleName: { type: String, require: true },
  lastName: { type: String, require: true },
  sex: { type: String, require: true, enum: ["F", "M"] },
  dateOfBirth: { type: Date, require: true, default: Date.now },
  placeOfBirth: { type: String, require: true },
  deliveryMethod: { type: String, require: true },
  nationality: { type: String, require: true },
  weight: { type: Number, require: true, min: 0 },
  attendantProfessional: { type: String, require: true },
  motherResidentInfo: {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    address: { type: String, require: true },
    phone: { type: String, require: true },
  },
  fatherResidentInfo: {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    address: { type: String, require: true },
    phone: { type: String, require: true },
  },
});

module.exports = mongoose.model("Birth", BirthSchema);
