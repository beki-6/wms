const mongoose = require("mongoose");
const db = require("./db");

const PostSchema = new mongoose.Schema({
  title: { type: String, require: false },
  topic: { type: String, require: false },
  body: { type: String, require: true },
  dateModified: { type: Date, require: false, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
