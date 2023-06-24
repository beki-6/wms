const redis = require('redis');
const redisClient = redis.createClient();
const Complaint = require('./models/complaint');
const subscriber = redisClient.duplicate();

const subscribe = async () => {
    await subscriber.connect();
    await subscriber.subscribe('complaintChannel', async message => {
        const complaint = new Pending(JSON.parse(message));
        await complaint.save();
    });
}

module.exports = subscribe;