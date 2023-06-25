const mongoose = require("mongoose");
const db = require("./db");

const StaffSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
  password: { type: String, require: true, minLength: 8 },
  role: { type: String, require: true },
  // photo: {type: String},
  token: { type: String },
});

module.exports = mongoose.model("Staff", StaffSchema);
