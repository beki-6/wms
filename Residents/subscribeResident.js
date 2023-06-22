const redis = require('redis');
const {pendingResident} = require('./models/pending');
const redisClient = redis.createClient();

const subscriber = redisClient.duplicate();

let messages = [];

const subscribeResident = async () => {
    await subscriber.connect();
    await subscriber.subscribe('residentChannel', message => {
        messages.push(message);
    });
    while(messages.length > 0){
        let message = messages.pop();
        const pending = new pendingResident(message);
        await pending.save();
    }
}

module.exports = subscribeResident;