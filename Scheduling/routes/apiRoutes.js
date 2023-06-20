const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');
const redis = require('redis');
const redisClient = redis.createClient();
const publisher = redisClient.duplicate();

//GET all 
router.get('/schedule', async (req, res) => {
      try{
          const schedule = await Schedule.find();
          res.status(200).json(schedule);
      } catch(err){
          res.status(404).json({message: err.message});
      }
});
//POST a schedule
router.post('/schedule', async (req, res) => {
      const newSchedule = new Schedule({
          user: req.body.user,
          date: req.body.date,
          partOfDay: req.body.partOfDay
      });
      try{
          const schedule = await newSchedule.save();
          await publisher.connect();
          await publisher.publish('notificationChannel', JSON.stringify(schedule));
          res.status(201).json(schedule);
      } catch(err){
          res.status(400).json({message: err.message});
      }
});
//GET a schedule
router.get('/schedule/:id', getScheduleByID, async (req, res) => {
      res.status(200).json(res.schedule);
});
//UPDATE a schedule
router.patch('/schedule/:id', getScheduleByID, async (req, res) => {
      if(req.body.user != null) { res.schedule.user = req.body.user; }
      if(req.body.date != null) { res.schedule.date = req.body.date; }
      if(req.body.partOfDay != null) { res.schedule.partOfDay = req.body.partOfDay; }
      try{
          const updatedSchedule = await res.schedule.save();
          res.json(updatedSchedule);
      } catch(err) {
          res.status(400).json({message: err.message});
      }
});
//DELETE a schedule
router.delete('/schedule/:id', async (req, res) => {
      try{
          await Schedule.deleteOne({ "_id": req.params.id});
          res.json({message: "Schedule deleted."});
      } catch(err) {
          res.status(500).json({message: err.message});
      }
});

async function getScheduleByID(req, res, next) {
      let schedule = {};
      try{
          schedule = await Schedule.findById(req.params.id);
          if(schedule == null){
              return res.status(404).json({message: "schedule with the specified Id doesn't exist."});
          }
      }
      catch(err){
          return res.status(500).json({message: err.message});
      }
      res.schedule = schedule;
      next();
};

module.exports = router;