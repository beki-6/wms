const express = require("express");
const controllers = require("../apiControllers");
const router = express.Router();

router.get("/post", controllers.getAllPosts);
router.post("/post", controllers.postNew);
router.get("/post/latest", controllers.getOnePost);
router.patch("/post/:id", controllers.getPostById, controllers.updatePost);
router.delete("/post/:id", controllers.deletePost);
router.get("/stat", controllers.getStats);
router.post("/stat", controllers.postStats);
router.get("/stat/:id", controllers.getStatById, controllers.getOneStat);
router.patch("/stat/:id", controllers.getStatById, controllers.updateStat);
router.delete("/stat/:id", controllers.deleteStat);

module.exports = router;
