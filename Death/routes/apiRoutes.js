const express = require('express');
const router = express.Router();
const controllers = require('../apiControllers');

//GET all deaths
router.get('/death', controllers.getAllDeath);

//GET pending death requests
router.get('/death', controllers.pendingDeaths);

//POST a death
router.post('/death', controllers.postDeath);

//GET a death
router.get('/death/:id', controllers.getDeathByID, controllers.getOneDeath);

//UPDATE a death
router.patch('/death/:id', controllers.getDeathByID, controllers.updateDeath);

//DELETE a death
router.delete('/death/:id', controllers.deleteDeath);

module.exports = router;