const Death = require('./models/death');
const Pending = require('./models/pending');
const redis = require('redis');
const redisClient = redis.createClient();
const publisher = redisClient.duplicate();

const getAllDeath = async (req, res) => {
    try{
        const deaths = await Death.find();
        res.status(200).json(deaths);
    } catch(err){
        res.status(404).json({message: err.message});
    }
}

const pendingDeaths = async (req, res) => {
    const pending = await Pending.find();
    res.status(200).json(pending);
}

const postDeath = async (req, res) => {
    const newdeath = new Death({
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      dateOfDeath: req.body.dateOfDeath,
      placeOfDeath: req.body.placeOfDeath,
      reasonOfDeath: req.body.reasonOfDeath,
      dateOfBirth: req.body.dateOfBirth,
      age: req.body.age      
    });
    try{
      const death = await newdeath.save();
      await publisher.publish('statChannel', 'death');
      res.status(201).json(death);
    } catch(err){
      res.status(400).json({message: err.message});
    }
}

const getOneDeath = async (req, res) => {
    res.status(200).json(res.death);
}

const updateDeath = async (req, res) => {
    if(req.body.deceasedResidentInfo != null) { res.death.deceasedResidentInfo = req.body.deceasedResidentInfo; }
    if(req.body.dateOfDeath != null) { res.death.dateOfDeath = req.body.dateOfDeath; }
    if(req.body.placeOfDeath != null) { res.death.placeOfDeath = req.body.placeOfDeath; }
    if(req.body.dateOfCertificateIssued != null) { res.death.dateOfCertificateIssued = req.body.dateOfCertificateIssued; }
    if(req.body.nameOfCivilRegistrar != null) { res.death.nameOfCivilRegistrar = req.body.nameOfCivilRegistrar; }
    if(req.body.certificateNumber != null) { res.death.certificateNumber = req.body.certificateNumber; }
    try{
        const updateddeath = await res.death.save();
        res.json(updateddeath);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

const deleteDeath = async (req, res) => {
    try{
        await Death.deleteOne({ "_id": req.params.id});
        res.json({message: "death certificate deleted."});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

async function getDeathByID(req, res, next) {
    let death = {};
    try{
        death = await Death.findById(req.params.id);
        if(death == null){
            res.status(404).json({message: "death certificate with the specified Id doesn't exist."});
        }
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
    res.death = death;
    next();
};

const controllers = {
    getAllDeath,
    getOneDeath,
    postDeath,
    deleteDeath,
    updateDeath,
    getDeathByID,
    pendingDeaths
}

module.exports = controllers;

