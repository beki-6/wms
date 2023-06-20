require('dotenv').config();

const express = require('express');
const router = express.Router();
const Staff = require('../models/staff');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {authenticateToken, requireRole} = require('../auth');

//GET all staffs
router.get('/staff', authenticateToken, requireRole("Admin"), async (req, res) => {
     console.log('Here')
      try{
          const staffs = await Staff.find();
          res.status(200).json(staffs);
      } catch(err){
          res.status(404).json({message: err.message});
      }
});
//POST a 
router.post('/staff', async (req, res) => {
    console.log("Here");
    const {username, phone, password, role, photo} = req.body;
    const staffExists = await Staff.findOne({phone});
    if(staffExists){
        return res.status(400).json({message: "staff already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newstaff = await Staff.create({
        username: username,
        phone: phone,
        password: hashedPassword,
        role: role,
        photo: photo
    });
    if(!newstaff){
        return res.status(400).json({message: "staff creation failed"});
    }
    res.status(201).json({
        _id: newstaff.id,
        username: newstaff.username,
        phone: newstaff.phone,
        password: newstaff.password,
        role: newstaff.role,
        photo: newstaff.photo,
        token: generateToken(newstaff)  
    });
});
//GET a birth
router.get('/staff/:id', getstaffById, async (req, res) => {
      res.status(200).json(res.staff);
});
//UPDATE a birth
router.patch('/staff/:id', getstaffById, async (req, res) => {
      if(req.body.username != null) { res.staff.username = req.body.username; }
      if(req.body.email != null) { res.staff.email = req.body.email; }
      if(req.body.photo != null) { res.staff.photo = req.body.photo; }
      if(req.body.password != null) { res.staff.password = req.body.password; }
      if(req.body.role != null) { res.staff.role = req.body.role; }
      if(req.body.photo != null) { res.staff.photo = req.body.photo; }
      try{
          const updatedstaff = await res.staff.save();
          res.json(updatedstaff);
      } catch(err) {
          res.status(400).json({message: err.message});
      }
});
//DELETE a birth
router.delete('/staff/:id', async (req, res) => {
      try{
          await Staff.deleteOne({ "_id": req.params.id});
          res.json({message: "staff deleted."});
      } catch(err) {
          res.status(500).json({message: err.message});
      }
});
router.post('/login', async (req, res) => {
    const {phone, password} = req.body;
    const user = await Staff.findOne({phone});
    if(!user) return res.status(400).json({message: "user not found"});
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return res.status(400).json({message: "Invalid credentials"});
    const token = generateToken(user);
    res.status(200).json({token});
});
async function getstaffById(req, res, next) {
      let staff = {};
      try{
          staff = await Staff.findById(req.params.id);
          if(staff == null){
              return res.status(404).json({message: "staff with the specified Id doesn't exist."});
          }
      }
      catch(err){
          res.status(500).json({message: err.message});
      }
      res.staff = staff;
      next()
};
function generateToken(user){
    return jwt.sign(
        {id: user._id, username: user.username, role: user.role},
        process.env.TOKEN_KEY,
        {expiresIn: '1h'}
    );
}
module.exports = {router, generateToken};