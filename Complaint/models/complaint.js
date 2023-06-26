const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  body: JSON,
});

const Complaint = mongoose.model("Complaint", ComplaintSchema);

module.exports = Complaint;
