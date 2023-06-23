const mongoose = require("mongoose");
const db = require("./db");

const WeddingSchema = new mongoose.Schema({
  wifeResidentInfo: {
    wfirstName: { type: String, require: true },
    wlastName: { type: String, require: true },
    waddress: { type: String, require: true },
    wphone: { type: String, require: true },
    wage: { type: Number, require: true },
  },
  husbandResidentInfo: {
    hfirstName: { type: String, require: true },
    hlastName: { type: String, require: true },
    haddress: { type: String, require: true },
    hphone: { type: String, require: true },
    hage: { type: Number, require: true },
  },
  dateOfMarriage: { type: Date, require: true, default: Date.now },
  placeOfMarriage: { type: String, require: true },
});

module.exports = mongoose.model("Wedding", WeddingSchema);
