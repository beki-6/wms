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
    mfirstName: { type: String, require: true },
    mlastName: { type: String, require: true },
    maddress: { type: String, require: true },
    mphone: { type: String, require: true },
  },
  fatherResidentInfo: {
    ffirstName: { type: String, require: true },
    flastName: { type: String, require: true },
    faddress: { type: String, require: true },
    fphone: { type: String, require: true },
  },
});

module.exports = mongoose.model("Birth", BirthSchema);
