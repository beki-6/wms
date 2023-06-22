const redis = require('redis');
const {pendingID} = require('./models/pending');
const redisClient = redis.createClient();

const subscriber = redisClient.duplicate();

let messages = [];

const subscribeID = async () => {
    await subscriber.connect();
    await subscriber.subscribe('idChannel', message => {
        messages.push(message);
    });
    while(messages.length > 0){
        let message = messages.pop();
        const pending = new pendingID(message);
        await pending.save();
    }
}

module.exports = subscribeID;