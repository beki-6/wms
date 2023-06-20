const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {generateToken} = require('./apiRoutes');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', async () => {
  const {username, phone, password, role, photo} = req.body;
  const userExists = await User.findOne({phone});
  if(userExists){
      return res.status(400).json({message: "User already exists"})
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
      username: username,
      phone: phone,
      password: hashedPassword,
      role: role,
      photo: photo
  });
  if(!newUser){
      return res.status(400).json({message: "User registration failed"});
  }
  res.status(201).json({
      _id: newUser.id,
      username: newUser.username,
      phone: newUser.phone,
      password: newUser.password,
      role: newUser.role,
      photo: newUser.photo,
      token: generateToken(newUser)  
  });
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

module.exports = router;
