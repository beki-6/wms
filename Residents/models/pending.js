const mongoose = require("mongoose");

const PendingResidentSchema = new mongoose.Schema({
  type: String,
  body: JSON,
  witness: {type: Boolean, default: false},
  transaction: {type: Boolean, default: false}
});

const PendingIDSchema = new mongoose.Schema({
  type: String,
  requester: String,
  body: JSON,
});

const pendingResident = mongoose.model(
  "PendingResident",
  PendingResidentSchema
);
const pendingID = mongoose.model("PendingID", PendingIDSchema);

module.exports = { pendingID, pendingResident };
