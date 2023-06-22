const redis = require('redis');
const {pendingID} = require('./models/pending');
const redisClient = redis.createClient();
const subscriber = redisClient.duplicate();

const subscribeID = async () => {
    await subscriber.connect();
    await subscriber.subscribe('idChannel', async message => {
        const pending = new pendingID(JSON.parse(message));
        await pending.save();
    });
}

module.exports = subscribeID;