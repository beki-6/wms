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
    body: req.body.body,
  });
  try {
    if (newRequest.type === "birth") {
      await publisher.publish("birthChannel", JSON.stringify(newRequest));
      res.status(200).json({ message: "Form Sumbitted Successfully!!" });
      console.log("message published");
    } else if (newRequest.type === "wedding") {
      await publisher.publish("weddingChannel", JSON.stringify(newRequest));
      res.status(200).json({ message: "Form Sumbitted Successfully!!" });
      console.log("message published");
    } else if (newRequest.type === "resident") {
      await publisher.publish("residentChannel", JSON.stringify(newRequest));
      res.status(200).json({ message: "Form Sumbitted Successfully!!" });
      console.log("message published");
    } else if (newRequest.type === "id") {
      await publisher.publish("idChannel", JSON.stringify(newRequest));
      res.status(200).json({ message: "Form Sumbitted Successfully!!" });
      console.log("message published");
    } else if (newRequest.type === "account") {
      await publisher.publish("accountChannel", JSON.stringify(newRequest));
      res.status(200).json({ message: "Form Sumbitted Successfully!!" });
      console.log("message published");
    } else if (newRequest.type === "death") {
      await publisher.publish("deathChannel", JSON.stringify(newRequest));
      res.status(200).json({ message: "Form Sumbitted Successfully!!" });
      console.log("message published");
    } else if (newRequest.type === "complaint") {
      await publisher.publish("complaintChannel", JSON.stringify(newRequest));
      res.status(200).json({ message: "Form Sumbitted Successfully!!" });
      console.log("message published");
    } else {
      console.log("No redis channel");
      res.status(400).json({ message: "Something went wrong!!" });
    }
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
