const redis = require('redis');
const redisClient = redis.createClient();

const subscriber = redisClient.duplicate();

const subscribe = async () => {
    await subscriber.connect();
    await subscriber.subscribe('statChannel', message => {
        console.log(message);
    });
}

module.exports = subscribe;