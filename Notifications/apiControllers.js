const Notification = require('../models/notification');
// const redis = require('redis');
// const redisClient = redis.createClient();
const {sendMessages} = require('./subscribe');

const getAllNotifications = async (req, res) => {
    try{
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch(err){
        res.status(404).json({message: err.message});
    }
}

const postNotification = async (req, res) => {
    const messages = sendMessages();
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
}

const getOneNotification = async (req, res) => {
    res.status(200).json(res.notification);
}

const deleteNotification = async (req, res) => {
    try{
        await Notification.deleteOne({ "_id": req.params.id});
        res.json({message: "Notification deleted."});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

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

const controllers = {
    getAllNotifications,
    postNotification,
    getOneNotification,
    deleteNotification,
    getNotificationByID
}

module.exports = controllers;