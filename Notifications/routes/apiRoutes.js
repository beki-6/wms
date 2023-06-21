const express = require('express');
const controllers = require('../apiControllers');
const router = express.Router();

//GET all notifications
router.get('/notification', controllers.getAllNotifications);

//POST a notification
router.post('/notification', controllers.postNotification);

//GET a notification
router.get('/notification/:id', controllers.getNotificationByID, controllers.getOneNotification);

//DELETE a notification
router.delete('/notification/:id', controllers.deleteNotification);

module.exports = router;