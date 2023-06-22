const redis = require('redis');
const {pendingResident} = require('./models/pending');
const redisClient = redis.createClient();

const subscriber = redisClient.duplicate();

const subscribeResident = async () => {
    await subscriber.connect();
    await subscriber.subscribe('birthChannel', async message => {
        const pending = new pendingResident(JSON.parse(message));
        await pending.save();
    });
}

module.exports = subscribeResident;