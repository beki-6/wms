const redis = require('redis');
const redisClient = redis.createClient();
const Pending = require('./models/pending');
const subscriber = redisClient.duplicate();

let messages = [];

const subscribe = async () => {
    await subscriber.connect();
    await subscriber.subscribe('birthChannel', message => {
        messages.push(message);
    });
    while(messages.length > 0){
        let message = messages.pop();
        const pending = new Pending(message);
        await pending.save();
    }
}

module.exports = subscribe;