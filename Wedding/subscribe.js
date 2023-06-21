const redis = require('redis');
const redisClient = redis.createClient();

const subscriber = redisClient.duplicate();

let messages = [];

const subscribe = async () => {
    await subscriber.connect();
    await subscriber.subscribe('weddingChannel', message => {
        messages.push(message);
    });
}

function sendMessages(){
    return messages;
}

module.exports = {subscribe, sendMessages};