const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');

//GET all 
router.get('/notification', async (req, res) => {
      try{
          const notifications = await Notification.find();
          res.status(200).json(notifications);
      } catch(err){
          res.status(404).json({message: err.message});
      }
});
//POST a notification
router.post('/notification', async (req, res) => {
      const newNotification = new Notification({
          user: req.body.user,
          body: req.body.body,
          date: req.body.date
      });
      try{
          const notification = await newNotification.save();
          res.status(201).json(notification);
      } catch(err){
          res.status(400).json({message: err.message});
      }
});
//GET a notification
router.get('/notification/:id', getNotificationByID, async (req, res) => {
      res.status(200).json(res.notification);
});
//UPDATE a notification
router.patch('/notification/:id', getNotificationByID, async (req, res) => {
      if(req.body.user != null) { res.notification.user = req.body.user; }
      if(req.body.body != null) { res.notification.body = req.body.body; }
      if(req.body.date != null) { res.notification.date = req.body.date; }
      try{
          const updatedNotification = await res.notification.save();
          res.json(updatedNotification);
      } catch(err) {
          res.status(400).json({message: err.message});
      }
});
//DELETE a notification
router.delete('/notification/:id', async (req, res) => {
      try{
          await Notification.deleteOne({ "_id": req.params.id});
          res.json({message: "Notification deleted."});
      } catch(err) {
          res.status(500).json({message: err.message});
      }
});

async function getNotificationByID(req, res, next) {
      let notification = {};
      try{
          notification = await Notification.findById(req.params.id);
          if(notification == null){
              res.status(404).json({message: "Notification with the specified Id doesn't exist."});
          }
      }
      catch(err){
          return res.status(500).json({message: err.message});
      }
      res.notification = notification;
      next();
};

module.exports = router;