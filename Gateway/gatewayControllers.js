const Request = require("./models/request");

const redis = require("redis");
const redisClient = redis.createClient();
const publisher = redisClient.duplicate();

const getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getOneRequest = async (req, res) => {
  res.status(200).json(res.request);
};

const postRequest = async (req, res) => {
  await publisher.connect();
  const newRequest = new Request({
    type: req.body.type,
    requester: req.body.requester,
    body: req.body.body,
  });
  try {
    if (newRequest.type === "birth") await publisher.publish("birthChannel", JSON.stringify(newRequest));
    else if (newRequest.type === "wedding")
      publisher.publish("weddingChannel", JSON.stringify(newRequest));
    else if (newRequest.type === "resident" || newRequest.type === "id")
      publisher.publish("residentChannel", JSON.stringify(newRequest));
    else if (newRequest.type === "account")
      publisher.publish("accountChannel", JSON.stringify(newRequest));
    else if (newRequest.type === "death")
      publisher.publish("deathChannel", JSON.stringify(newRequest));
    else console.log("No redis channel");
    console.log("message published");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteRequest = async (req, res) => {
  try {
    await Request.deleteOne({ _id: req.params.id });
    res.json({ message: "Request deleted." });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

async function getRequestByID(req, res, next) {
  let request = {};
  try {
    request = await Request.findById(req.params.id);
    if (request == null) {
      res
        .status(404)
        .json({ message: "request with the specified Id doesn't exist." });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.request = request;
  next();
}

const controllers = {
  getRequestByID,
  getOneRequest,
  getRequests,
  postRequest,
  deleteRequest,
};

module.exports = controllers;
