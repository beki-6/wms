const {subscribe, messages} = require('./subscribe');
const DELAY_DAYS = 10;
const redis = require('redis');
const redisClient = redis.createClient();
const publisher = redisClient.duplicate();

subscribe();

async function schedule(){
    let notification = {
        user: "",
        date: Date.now(),
        message: ""
    };
    await publisher.connect();
    while(messages.length > 0){
        let message = messages.pop();
        notification.user = message;
        notification.date.setDate(notification.date.getDay() + DELAY_DAYS);
        await publisher.publish('notificationChannel', JSON.stringify(notification));
    }
}

module.exports = schedule;
