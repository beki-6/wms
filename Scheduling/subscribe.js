const redis = require('redis');
const redisClient = redis.createClient();

const subscriber = redisClient.duplicate();
const messages = []; 

const subscribe = async () => {
    await subscriber.connect();
    await subscriber.subscribe('scheduleChannel', message => {
        console.log(message);
        messages.push(message);
    });
}

module.exports = {subscribe, messages};