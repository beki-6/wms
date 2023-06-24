const Complaint = require("./models/complaint");

const getAllComplaint = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getOneComplaint = async (req, res) => {
  res.status(200).json(res.complaint);
};

const deleteComplaint = async (req, res) => {
  try {
    await Complaint.deleteOne({ _id: req.params.id });
    res.json({ message: "complaint deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function getComplaintByID(req, res, next) {
  let complaint = {};
  try {
    complaint = await Complaint.findById(req.params.id);
    if (complaint == null) {
      res.status(404).json({
        message: "complaint with the specified Id doesn't exist.",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.complaint = complaint;
  next();
}

const controllers = {
  getAllComplaint,
  getOneComplaint,
  deleteComplaint,
  getComplaintByID,
};

module.exports = controllers;
