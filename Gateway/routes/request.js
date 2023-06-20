const express = require('express');
const router = express.Router();
const Request = require('../models/request');
const {authenticateToken, requireRole} = require('../auth');
const redis = require('redis');
const redisClient = redis.createClient();
const publisher = redisClient.duplicate();

router.get('/', async (req, res) => {
    try{
        const requests = await Request.find();
        res.status(200).json(requests);
    } catch(err){
        res.status(404).json({message: err.message});
    }
});
router.get('/:id', getRequestByID, async (req, res) => {
    res.status(200).json(res.request);
});
router.post('/', async (req, res) => {
    const newRequest = new Request({
        type: req.body.type,
        requester: req.body.requester,
        body: req.body.body
    });
    try{
        const request = await newRequest.save();
        await publisher.connect();
        if(request.type === 'Birth') await redisClient.publish('birthChannel', JSON.stringify(request));
        else if(request.type === 'Wedding') redisClient.publish('weddingChannel', JSON.stringify(request));
        else if(request.type === 'Registration') redisClient.publish('residentChannel', JSON.stringify(request));
        else if(request.type === 'Account') redisClient.publish('accountChannel', JSON.stringify(request));
        else if(request.type === 'Death') redisClient.publish('deathChannel', JSON.stringify(request));
        else console.log("No redis channel");
        console.log('message published');
        res.status(201).json(request);
    } catch(err){
        res.status(400).json({message: err.message});
    }
});
router.patch('/:id', getRequestByID, async (req, res) => {
    if(req.body.type != null) { res.request.type = req.body.type; }
    if(req.body.requester != null) { res.request.requester = req.body.requester; }
    if(req.body.body != null) { res.request.body = req.body.body; }
    try{
        const updatedRequest = await res.request.save();
        res.status(201).json(updatedRequest);
    } catch(err){
        res.status(400).json({message: err.message});
    }
});
router.delete('/:id', async (req, res) => {
    try{
        await Request.deleteOne({"_id": req.params.id});
        res.json({message: "Request deleted."});
    } catch(err){
        res.status(404).json({message: err.message});
    }
});
async function getRequestByID(req, res, next) {
    let request = {};
    try{
        request = await Request.findById(req.params.id);
        if(request == null){
            res.status(404).json({message: "request with the specified Id doesn't exist."});
        }
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
    res.request = request;
    next();
};
module.exports = router;