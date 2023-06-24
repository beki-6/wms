const express = require("express");
const controllers = require("../apiControllers");
const router = express.Router();

//GET all complaints
router.get("/complaint", controllers.getAllComplaint);
//GET a complaint
router.get(
  "/complaint/:id",
  controllers.getComplaintByID,
  controllers.getOneComplaint
);
//DELETE a complaint
router.delete("/complaint/:id", controllers.deleteComplaint);

module.exports = router;
