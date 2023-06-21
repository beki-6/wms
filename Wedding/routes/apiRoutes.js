const express = require('express');
const controllers = require('../apiControllers');
const router = express.Router();

//GET all weddings
router.get('/wedding', controllers.getAllWedding);
//GET pending wedding requests 
router.get('/wedding/pending', controllers.pendingWedding);
//POST a wedding
router.post('/wedding', controllers.postWedding);
//GET a wedding
router.get('/wedding/:id', controllers.getweddingByID, controllers.getOneWedding);
//UPDATE a wedding
router.patch('/wedding/:id', controllers.getWeddingByID, controllers.updateWedding);
//DELETE a wedding
router.delete('/wedding/:id', controllers.deleteWedding);

module.exports = router;