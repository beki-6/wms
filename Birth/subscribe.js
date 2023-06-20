const redis = require('redis');
const redisClient = redis.createClient();

const subscriber = redisClient.duplicate();

let messages = [];

const subscribe = async () => {
    await subscriber.connect();
    await subscriber.subscribe('birthChannel', message => {
        // messages.push(message);
        console.log(message);
    });
}

module.exports = {subscribe, messages};