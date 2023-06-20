const redis = require('redis');
const Request = require('./models/request');

const redisClient = redis.createClient();

const sendToRedis = async () => {
    await redisClient.connect();
    const cursor = Request.find().cursor();
    cursor.on('data', (doc) => {
        // Send data to Redis stream
        redisClient.xadd('requestStream', '*', 'data', JSON.stringify(doc));
      });
    cursor.on('end', () => {
        console.log("finished sending data");
        redisClient.quit();
    })
}

module.exports = sendToRedis;