const Post = require('./models/posts');
const Stat = require('./models/stats');

const getAllPosts = async (req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch(err){
        res.status(404).json({message: err.message});
    }
}

const postNew = async (req, res) => {
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
}

const getOnePost = async (req, res) => {
    res.status(200).json(res.post);
}

const updatePost = async (req, res) => {
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
}

const deletePost = async (req, res) => {
    try{
        await Post.deleteOne({ "_id": req.params.id});
        res.json({message: "Post deleted."});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

const getStats = async (req, res) => {
    try{
        const stats = await Stat.find();
        res.status(200).json(stats);
    } catch(err){
        res.status(404).json({message: err.message});
    }
}

const postStats = async (req, res) => {
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
}

const getOneStat = async (req, res) => {
    res.status(200).json(res.stat);
}

const updateStat = async (req, res) => {
    if(req.body.category != null) { res.stat.category = req.body.category; }
    if(req.body.date != null) { res.stat.date = req.body.date; }
    if(req.body.totalNumberOfIssuesInCategory != null) { res.stat.totalNumberOfIssuesInCategory = req.body.totalNumberOfIssuesInCategory; }
    try{
        const updatedStat = await res.stat.save();
        res.json(updatedStat);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

const deleteStat = async (req, res) => {
    try{
        await Stat.deleteOne({ "_id": req.params.id});
        res.json({message: "Stat deleted."});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}
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

const controllers = {
    getAllPosts,
    getOnePost,
    postNew,
    updatePost,
    deletePost,
    getStatById,
    getStats,
    postStats,
    getOneStat,
    deleteStat,
    updateStat
}

module.exports = controllers;