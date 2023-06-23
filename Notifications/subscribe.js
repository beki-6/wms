const redis = require('redis');
const redisClient = redis.createClient();
const Notification = require('./models/notification');
const subscriber = redisClient.duplicate();

const subscribe = async () => {
    await subscriber.connect();
    await subscriber.subscribe('notificationChannel', async message => {
        const notification = new Notification(JSON.parse(message));
        await notification.save();
    });
}

module.exports = subscribe;