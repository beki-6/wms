const redis = require('redis');
const redisClient = redis.createClient();
const Stat = require('./models/stats');
const subscriber = redisClient.duplicate();

const subscribeStat = async () => {
    await subscriber.connect();
    await subscriber.subscribe('statsChannel', async message => {
        const stat = await Stat.find({category: message.type});
        stat.totalNumberOfIssuesInCategory++;
        await stat.save();    
    });

}

module.exports = subscribeStat;