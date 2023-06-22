const express = require("express");
const controllers = require("../apiControllers");
const router = express.Router();

//GET all residents
router.get("/resident", controllers.getAllResidents);
router.get(
  "/resident/pending",
  controllers.pendingResidentialRegistrationRequests
);
router.get("/id/pending", controllers.pendingIDRequests);
//POST a resident
router.post("/resident", controllers.postResident);
//GET a resident

router.get(
  "/resident/:id",
  controllers.getResidentByID,
  controllers.getOneResident
);
//UPDATE a resident
router.patch(
  "/resident/:id",
  controllers.getResidentByID,
  controllers.updateResident
);
//DELETE a resident
router.delete("/resident/:id", controllers.deleteResident);
//GET all Ids
router.get("/id", controllers.getAllIds);
//POST an Id
router.post("/id", controllers.postNewId);
//GET an Id
router.get("/id/:id", controllers.getIdByID, controllers.getOneId);
//UPDATE an Id
router.patch("/id/:id", controllers.getIdByID, controllers.updateId);
//DELETE an Id
router.delete("/id/:id", controllers.deleteId);

module.exports = router;
