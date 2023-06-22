const redis = require('redis');
const redisClient = redis.createClient();
const Pending = require('./models/pending');
const subscriber = redisClient.duplicate();

const subscribe = async () => {
    await subscriber.connect();
    await subscriber.subscribe('deathChannel', async message => {
        const pending = new Pending(JSON.parse(message));
        await pending.save();
    });
}

module.exports = subscribe;