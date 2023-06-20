const express = require('express');
const router = express.Router();
const Wedding = require('../models/wedding');

//GET all 
router.get('/wedding', async (req, res) => {
      try{
          const weddings = await Wedding.find();
          res.status(200).json(weddings);
      } catch(err){
          res.status(404).json({message: err.message});
      }
});
//POST a wedding
router.post('/wedding', async (req, res) => {
      const newwedding = new Wedding({
        certificateNumber: req.body.certificateNumber,
        wifeResidentInfo: req.body.wifeResidentInfo,
        husbandResidentInfo: req.body.husbandResidentInfo,
        dateOfMarriage: req.body.dateOfMarriage,
        placeOfMarriageRegistration: req.body.placeOfMarriageRegistration,
        dateOfMarriageRegistration: req.body.dateOfMarriageRegistration,
        dateOfCertificateIssued: req.body.dateOfCertificateIssued,
        nameOfCivilRegistrar: req.body.nameOfCivilRegistrar
      });
      try{
        const wedding = await newwedding.save();
        res.status(201).json(wedding);
      } catch(err){
        res.status(400).json({message: err.message});
      }
});
//GET a wedding
router.get('/wedding/:id', getweddingByID, async (req, res) => {
      res.status(200).json(res.wedding);
});
//UPDATE a wedding
router.patch('/wedding/:id', getweddingByID, async (req, res) => {
    if(req.body.certificateNumber != null) { res.wedding.certificateNumber = req.body.certificateNumber; }
    if(req.body.wifeResidentInfo != null) { res.wedding.wifeResidentInfo = req.body.wifeResidentInfo; }
    if(req.body.husbandResidentInfo != null) { res.wedding.husbandResidentInfo = req.body.husbandResidentInfo; }
    if(req.body.dateOfMarriage != null) { res.wedding.dateOfMarriage = req.body.dateOfMarriage; }
    if(req.body.placeOfMarriageRegistration != null) { res.wedding.placeOfMarriageRegistration = req.body.placeOfMarriageRegistration; }
    if(req.body.dateOfMarriageRegistration != null) { res.wedding.dateOfMarriageRegistration = req.body.dateOfMarriageRegistration; }
    if(req.body.dateOfCertificateIssued != null) { res.wedding.dateOfCertificateIssued = req.body.dateOfCertificateIssued; }
    if(req.body.nameOfCivilRegistrar != null) { res.wedding.nameOfCivilRegistrar = req.body.nameOfCivilRegistrar; }
    try{
        const updatedwedding = await res.wedding.save();
        res.json(updatedwedding);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
});
//DELETE a wedding
router.delete('/wedding/:id', async (req, res) => {
      try{
          await Wedding.deleteOne({ "_id": req.params.id});
          res.json({message: "wedding certificate deleted."});
      } catch(err) {
          res.status(500).json({message: err.message});
      }
});

async function getweddingByID(req, res, next) {
      let wedding = {};
      try{
          wedding = await Wedding.findById(req.params.id);
          if(wedding == null){
              res.status(404).json({message: "wedding certificate with the specified Id doesn't exist."});
          }
      }
      catch(err){
          res.status(500).json({message: err.message});
      }
      res.wedding = wedding;
      next();
};

module.exports = router;