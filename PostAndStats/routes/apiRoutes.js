const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const Stat = require('../models/stats');

//GET all accounts
router.get('/post', async (req, res) => {
      try{
          const posts = await Post.find();
          res.status(200).json(posts);
      } catch(err){
          res.status(404).json({message: err.message});
      }
});
router.post('/post', async (req, res) => {
      const newPost = new Post({
          title: req.body.title,
          topic: req.body.topic,
          body: req.body.body,
          dateModified: req.body.dateModified
      });
      try{
          const post = await newPost.save();
          res.status(201).json(post);
      } catch(err){
          res.status(400).json({message: err.message});
      }
});
//GET a birth
router.get('/post/:id', getPostById, async (req, res) => {
      res.status(200).json(res.post);
});
//UPDATE a birth
router.patch('/post/:id', getPostById, async (req, res) => {
      if(req.body.title != null) { res.post.title = req.body.title; }
      if(req.body.topic != null) { res.post.topic = req.body.topic; }
      if(req.body.body != null) { res.post.body = req.body.body; }
      if(req.body.dateModified != null) { res.post.dateModified = req.body.dateModified; }
      try{
          const updatedPost = await res.post.save();
          res.json(updatedPost);
      } catch(err) {
          res.status(400).json({message: err.message});
      }
});
router.delete('/post/:id', async (req, res) => {
      try{
          await Post.deleteOne({ "_id": req.params.id});
          res.json({message: "Post deleted."});
      } catch(err) {
          res.status(500).json({message: err.message});
      }
});
router.get('/stat', async (req, res) => {
    try{
        const stats = await Stat.find();
        res.status(200).json(stats);
    } catch(err){
        res.status(404).json({message: err.message});
    }
});
router.post('/stat', async (req, res) => {
    const newStat = new Stat({
        category: req.body.category,
        date: req.body.date,
        totalNumberOfIssuesInCategory: req.body.totalNumberOfIssuesInCategory
    });
    try{
        const stat = await newStat.save();
        res.status(201).json(stat);
    } catch(err){
        res.status(400).json({message: err.message});
    }
});
router.get('/stat/:id', getStatById, async (req, res) => {
    res.status(200).json(res.stat);
});
router.patch('/stat/:id', getStatById, async (req, res) => {
    if(req.body.category != null) { res.stat.category = req.body.category; }
    if(req.body.date != null) { res.stat.date = req.body.date; }
    if(req.body.totalNumberOfIssuesInCategory != null) { res.stat.totalNumberOfIssuesInCategory = req.body.totalNumberOfIssuesInCategory; }
    try{
        const updatedStat = await res.stat.save();
        res.json(updatedStat);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
});
router.delete('/stat/:id', async (req, res) => {
    try{
        await Stat.deleteOne({ "_id": req.params.id});
        res.json({message: "Stat deleted."});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});
async function getPostById(req, res, next) {
      let post = {};
      try{
          post = await Post.findById(req.params.id);
          if(post == null){
              res.status(404).json({message: "Post with the specified Id doesn't exist."});
          }
      }
      catch(err){
          res.status(500).json({message: err.message});
      }
      res.post = post;
      next();
};
async function getStatById(req, res, next) {
    let stat = {};
    try{
        stat = await Stat.findById(req.params.id);
        if(stat == null){
            res.status(404).json({message: "Stat with the specified Id doesn't exist."});
        }
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
    res.stat = stat;
    next();
};
module.exports = router;