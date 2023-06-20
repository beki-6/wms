const express = require('express');
const router = express.Router();
const Birth = require('../models/birth');
const redis = require('redis');
const redisClient = redis.createClient();
const subscriber = redisClient.duplicate();
const {messages} = require('../subscribe');

//GET all 
router.get('/birth', async (req, res) => {
      try{
          const births = await Birth.find();
          res.status(200).json(births);
      } catch(err){
          res.status(404).json({message: err.message});
      }
});
router.get('/birth/pending', async (req, res) => {
    const pending = JSON.stringify(messages);
    res.status(200).json(pending);
});
//POST a birth
router.post('/birth', async (req, res) => {
      const newbirth = new Birth({
          nameOfChild: req.body.nameOfChild,
          sex: req.body.sex,
          dateOfBirth: req.body.dateOfBirth,
          placeOfBirth: req.body.placeOfBirth,
          deliveryMethod: req.body.deliveryMethod,
          nationality: req.body.nationality,
          weight: req.body.weight,
          attendantProfessional: req.body.attendantProfessional,
          motherResidentInfo: req.body.motherResidentInfo,
          fatherResidentInfo: req.body.fatherResidentInfo
      });
      try{
          const birth = await newbirth.save();
          await publisher.connect();
          await publisher.publish('scheduleChannel', JSON.stringify());
          res.status(201).json(birth);
      } catch(err){
          res.status(400).json({message: err.message});
      }
});
//GET a birth
router.get('/birth/:id', getbirthByID, async (req, res) => {
    res.status(200).json(res.birth);
});
//UPDATE a birth
router.patch('/birth/:id', getbirthByID, async (req, res) => {
      if(req.body.nameOfChild != null) { res.birth.nameOfChild = req.body.nameOfChild; }
      if(req.body.sex != null) { res.birth.sex = req.body.sex; }
      if(req.body.dateOfBirth != null) { res.birth.fatherName = req.body.dateOfBirth; }
      if(req.body.placeOfBirth != null) { res.birth.placeOfBirth = req.body.placeOfBirth; }
      if(req.body.deliveryMethod != null) { res.birth.deliveryMethod = req.body.deliveryMethod; }
      if(req.body.nationality != null) { res.birth.nationality = req.body.nationality; }
      if(req.body.weight != null) { res.birth.weight = req.body.weight; }
      if(req.body.attendantProfessional != null) { res.birth.attendantProfessional = req.body.attendantProfessional; }
      if(req.body.motherResidentInfo != null) { res.birth.motherResidentInfo = req.body.motherResidentInfo; }
      if(req.body.fatherResidentInfo != null) { res.birth.fatherResidentInfo = req.body.fatherResidentInfo; }
      try{
          const updatedbirth = await res.birth.save();
          res.json(updatedbirth);
      } catch(err) {
          res.status(400).json({message: err.message});
      }
});
//DELETE a birth
router.delete('/birth/:id', async (req, res) => {
      try{
          await Birth.deleteOne({ "_id": req.params.id});
          res.json({message: "birth certificate deleted."});
      } catch(err) {
          res.status(500).json({message: err.message});
      }
});

async function getbirthByID(req, res, next) {
      let birth = {};
      try{
          birth = await Birth.findById(req.params.id);
          if(birth == null){
              res.status(404).json({message: "birth certificate with the specified Id doesn't exist."});
          }
      }
      catch(err){
          return res.status(500).json({message: err.message});
      }
      res.birth = birth;
      next();
};

module.exports = router;