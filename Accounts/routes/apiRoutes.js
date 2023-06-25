const express = require("express");
const router = express.Router();
const { authenticateToken, requireRole, generateToken } = require("../auth");
const controllers = require("../apiController");

//GET all staffs
router.get(
  "/account/staff",
  //   authenticateToken,
  //   requireRole("Admin"),
  controllers.getAllStaff
);

//POST a staff
router.post("/account/staff", controllers.registerStaff);

//GET a staff
router.get("/staff/:id", controllers.getStaffById, controllers.getOneStaff);

//UPDATE a staff
router.patch("/staff/:id", controllers.getStaffById, controllers.updateStaff);

//DELETE a staff
router.delete("/staff/:id", controllers.deleteStaff);

//sign in staff
router.post("/login", controllers.loginStaff);

module.exports = router;
