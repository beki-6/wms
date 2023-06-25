const express = require('express');
const controllers = require('../apiControllers');
const router = express.Router();

//GET all births
router.get('/birth', controllers.getAllBirths);

//GET pending birth requests
router.get('/birth/pending', controllers.pendingBirths);

//GET number of pending birth requests
router.get('/birth/pending/count', controllers.getNumberOfPendings);

//POST a birth
router.post('/birth', controllers.postBirth);

//GET birth by ID
router.get('/birth/:id', controllers.getBirthByID, controllers.getOneBirth);

//UPDATE a birth
router.patch('/birth/:id', controllers.getBirthByID, controllers.updateBirth);

//DELETE a birth
router.delete('/birth/:id', controllers.deleteBirth);

module.exports = router;