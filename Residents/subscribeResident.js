const redis = require("redis");
const { pendingResident } = require("./models/pending");
const redisClient = redis.createClient();
const { getWitnessAndNotify } = require("./apiControllers");

const subscriber = redisClient.duplicate();

const subscribeResident = async () => {
  await subscriber.connect();
  await subscriber.subscribe("residentChannel", async (message) => {
    message = JSON.parse(message);
    const requester = {
      name: message.body.name,
      phone: message.body.phoneNumber,
    };
    getWitnessAndNotify(message.body.witness, requester);
  });
};

module.exports = subscribeResident;
