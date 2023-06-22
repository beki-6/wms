const mongoose = require("mongoose");
const db = require("./db");

const DeathSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  middleName: { type: String, require: true },
  lastName: { type: String, require: true },
  placeOfDeath: { type: String, require: true },
  reasonOfDeath: { type: String, require: true },
  dateOfBirth: { type: Date, require: true },
  age: { type: Number, require: true },
});

module.exports = mongoose.model("Death", DeathSchema);
