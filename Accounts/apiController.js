require("dotenv").config();

const Staff = require("./models/staff");
const bcrypt = require("bcryptjs");
const { generateToken } = require("./auth");

const getAllStaff = async (req, res) => {
  try {
    const staffs = await Staff.find();
    res.status(200).json(staffs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const registerStaff = async (req, res) => {
  console.log("Here");
  const { username, phone, password, role, email } = req.body;
  const staffExists = await Staff.findOne({ phone });
  if (staffExists) {
    return res.status(400).json({ message: "staff already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const newstaff = await Staff.create({
      username: username,
      phone: phone,
      password: hashedPassword,
      role: role,
      // photo: photo
      email: email,
    });
    if (!newstaff) {
      return res.status(400).json({ message: "staff creation failed" });
    }
    res.status(201).json({
      _id: newstaff.id,
      username: newstaff.username,
      phone: newstaff.phone,
      password: newstaff.password,
      role: newstaff.role,
      // photo: newstaff.photo,
      email: newstaff.email,
      token: generateToken(newstaff),
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const getOneStaff = async (req, res) => {
  res.status(200).json(res.staff);
};

const updateStaff = async (req, res) => {
  if (req.body.username != null) {
    res.staff.username = req.body.username;
  }
  if (req.body.email != null) {
    res.staff.email = req.body.email;
  }
  if (req.body.photo != null) {
    res.staff.photo = req.body.photo;
  }
  if (req.body.password != null) {
    res.staff.password = req.body.password;
  }
  if (req.body.role != null) {
    res.staff.role = req.body.role;
  }
  if (req.body.photo != null) {
    res.staff.photo = req.body.photo;
  }
  try {
    const updatedstaff = await res.staff.save();
    res.json(updatedstaff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    await Staff.deleteOne({ _id: req.params.id });
    res.json({ message: "staff deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginStaff = async (req, res) => {
  const { phone, password } = req.body;
  const user = await Staff.findOne({ phone });
  if (!user) return res.status(400).json({ message: "user not found" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });
  const token = generateToken(user);
  res.status(200).json({ token });
};

async function getStaffById(req, res, next) {
  let staff = {};
  try {
    staff = await Staff.findById(req.params.id);
    if (staff == null) {
      return res
        .status(404)
        .json({ message: "staff with the specified Id doesn't exist." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.staff = staff;
  next();
}

const controllers = {
  getAllStaff,
  registerStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  loginStaff,
  getOneStaff,
};

module.exports = controllers;
