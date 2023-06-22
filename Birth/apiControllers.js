const Birth = require('./models/birth');
const Pending = require('./models/pending');

const redis = require('redis');
const redisClient = redis.createClient();
const publisher = redisClient.duplicate();
const {sendMessages} = require('./subscribe');

const getAllBirths = async (req, res) => {
    try{
        const births = await Birth.find();
        res.status(200).json(births);
    } catch(err){
        res.status(404).json({message: err.message});
    }
}

const pendingBirths = async (req, res) => {
    const pending = await Pending.find();
    res.status(200).json(pending);
}

const postBirth = async (req, res) => {
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
}

const getOneBirth = async (req, res) => {
    res.status(200).json(res.birth);
}

const updateBirth = async (req, res) => {
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
}

const deleteBirth = async (req, res) => {
    try{
        await Birth.deleteOne({ "_id": req.params.id});
        res.json({message: "birth certificate deleted."});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

async function getBirthByID(req, res, next) {
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

const controllers = {
    getAllBirths,
    pendingBirths,
    getOneBirth,
    postBirth,
    updateBirth,
    deleteBirth,
    getBirthByID
}

module.exports = controllers;