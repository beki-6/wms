const { Resident, Id } = require("./models/resident");
const { requireRole } = require("./auth");
const { sendMessages } = require("./subscribe");
const redis = require("redis");
const redisClient = redis.createClient();
const publisher = redisClient.duplicate();

const getAllResidents = async (req, res) => {
  try {
    const residents = await Resident.find();
    res.status(200).json(residents);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const pendingResidentialRegistrationRequests = async (req, res) => {
  const pendingMessage = { message: sendMessages() };
  //   const pending = JSON.parse(sendMessages());
  res.status(200).json(pendingMessage);
};
const pendingIDRequests = async (req, res) => {
  const pending = JSON.parse(sendMessages());
  res.status(200).json(pending);
};

const postResident = async (req, res) => {
  const newResident = new Resident({
    name: req.body.name,
    age: req.body.age,
    fatherName: req.body.fatherName,
    grandFatherName: req.body.grandFatherName,
    maritalStatus: req.body.maritalStatus,
    nationality: req.body.nationality,
    dateOfBirth: req.body.dateOfBirth,
    placeOfBirth: req.body.placeOfBirth,
    sex: req.body.sex,
    address: req.body.address,
    educationLevel: req.body.educationLevel,
    occupation: req.body.occupation,
    phoneNumber: req.body.phoneNumber,
    religion: req.body.religion,
    emergencyContact: req.body.emergencyContact,
    scheduleDate: req.body.scheduleDate,
  });
  try {
    const resident = await newResident.save();
    res.status(201).json(resident);
    await publisher.connect();
    publisher.publish("notificationChannel", JSON.stringify(newResident._id));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getOneResident = async (req, res) => {
  res.status(200).json(res.resident);
};

const updateResident = async (req, res) => {
  if (req.body.name != null) {
    res.resident.name = req.body.name;
  }
  if (req.body.age != null) {
    res.resident.age = req.body.age;
  }
  if (req.body.fatherName != null) {
    res.resident.fatherName = req.body.fatherName;
  }
  if (req.body.grandFatherName != null) {
    res.resident.grandFatherName = req.body.grandFatherName;
  }
  if (req.body.maritalStatus != null) {
    res.resident.maritalStatus = req.body.maritalStatus;
  }
  if (req.body.nationality != null) {
    res.resident.nationality = req.body.nationality;
  }
  if (req.body.dateOfBirth != null) {
    res.resident.dateOfBirth = req.body.dateOfBirth;
  }
  if (req.body.placeOfBirth != null) {
    res.resident.placeOfBirth = req.body.placeOfBirth;
  }
  if (req.body.sex != null) {
    res.resident.sex = req.body.sex;
  }
  if (req.body.address != null) {
    res.resident.address = req.body.address;
  }
  if (req.body.educationLevel != null) {
    res.resident.educationLevel = req.body.educationLevel;
  }
  if (req.body.occupation != null) {
    res.resident.occupation = req.body.occupation;
  }
  if (req.body.race != null) {
    res.resident.race = req.body.race;
  }
  if (req.body.phoneNumber != null) {
    res.resident.phoneNumber = req.body.phoneNumber;
  }
  if (req.body.religion != null) {
    res.resident.religion = req.body.religion;
  }
  if (req.body.emergencyContact != null) {
    res.resident.emergencyContact = req.body.emergencyContact;
  }
  try {
    const updatedResident = await res.resident.save();
    res.json(updatedResident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteResident = async (req, res) => {
  try {
    await Resident.deleteOne({ _id: req.params.id });
    res.json({ message: "Resident deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllIds = async (req, res) => {
  try {
    const ids = await Id.find();
    res.status(200).json(ids);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const postNewId = async (req, res) => {
  const newId = new Id({
    residentInfo: req.body.residentInfo,
    idNumber: req.body.idNumber,
    registrationNumber: req.body.registrationNumber,
    dateIssued: req.body.dateIssued,
    expiryDate: req.body.expiryDate,
  });
  try {
    const id = await newId.save();
    await publisher.connect();
    await publisher.publish(
      "notificationChannel",
      JSON.stringify(newId.residentInfo)
    );
    res.status(201).json(id);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getOneId = async (req, res) => {
  res.status(200).json(res.id);
};

const updateId = async (req, res) => {
  if (req.body.residentInfo != null) {
    res.id.residentInfo = req.body.residentInfo;
  }
  if (req.body.idNumber != null) {
    res.id.idNumber = req.body.idNumber;
  }
  if (req.body.registrationNumber != null) {
    res.id.registrationNumber = req.body.registrationNumber;
  }
  if (req.body.dateIssued != null) {
    res.id.dateIssued = req.body.dateIssued;
  }
  if (req.body.expiryDate != null) {
    res.id.expiryDate = req.body.expiryDate;
  }
  try {
    const updatedId = await res.id.save();
    res.json(updatedId);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteId = async (req, res) => {
  try {
    await Id.deleteOne({ _id: req.params.id });
    res.json({ message: "Id deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function getResidentByID(req, res, next) {
  let resident = {};
  try {
    resident = await Resident.findById(req.params.id);
    if (resident == null) {
      res
        .status(404)
        .json({ message: "Resident with the specified Id doesn't exist." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.resident = resident;
  next();
}
async function getIdByID(req, res, next) {
  let id = {};
  try {
    id = await Id.findById(req.params.id);
    if (id == null) {
      res.status(404).json({
        message: "Identification with the specified Id doesn't exist.",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.id = id;
  next();
}

const controllers = {
  getAllIds,
  postNewId,
  getIdByID,
  getAllResidents,
  getOneId,
  getResidentByID,
  getOneResident,
  updateId,
  updateResident,
  deleteId,
  deleteResident,
  postResident,
  pendingIDRequests,
  pendingResidentialRegistrationRequests,
};

module.exports = controllers;
