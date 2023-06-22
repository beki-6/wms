const mongoose = require("mongoose");
require("dotenv").config();

const db = mongoose.connect(process.env.dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.then(() => {
  console.log("Connected");
}).catch((err) => {
  console.log(err);
});

module.exports = db;
