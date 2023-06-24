const mongoose = require("mongoose");

const PendingSchema = new mongoose.Schema({
  type: String,
  body: JSON,
});

const Pending = mongoose.model("Pending", PendingSchema);

module.exports = Pending;
