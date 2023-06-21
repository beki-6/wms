const express = require('express');
const controllers = require('../gatewayControllers');
const router = express.Router();

router.get('/', controllers.getRequests);
router.get('/:id', controllers.getRequestByID, controllers.getOneRequest);
router.post('/', controllers.postRequest);
// router.patch('/:id', getRequestByID, async (req, res) => {
//     if(req.body.type != null) { res.request.type = req.body.type; }
//     if(req.body.requester != null) { res.request.requester = req.body.requester; }
//     if(req.body.body != null) { res.request.body = req.body.body; }
//     try{
//         const updatedRequest = await res.request.save();
//         res.status(201).json(updatedRequest);
//     } catch(err){
//         res.status(400).json({message: err.message});
//     }
// });
router.delete('/:id', controllers.deleteRequest);

module.exports = router;