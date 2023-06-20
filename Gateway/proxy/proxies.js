const { createProxyMiddleware } = require('http-proxy-middleware');

const residentProxy = createProxyMiddleware('/', {
    target: 'http://localhost:3000/api',
    changeOrigin: true
});
const birthProxy = createProxyMiddleware({
    target: 'http://localhost:3001/api',
    changeOrigin: true
});
const deathProxy = createProxyMiddleware({
    target: 'http://localhost:3002/api',
    changeOrigin: true
});
const weddingProxy = createProxyMiddleware({
    target: 'http://localhost:3003/api',
    changeOrigin: true
});
const accountsProxy = createProxyMiddleware({
    target: 'http://localhost:3004/api',
    changeOrigin: true
});
const postProxy = createProxyMiddleware({
    target: 'http://localhost:3005/api',
    changeOrigin: true
});
const notificationProxy = createProxyMiddleware({
    target: 'http://localhost:3006/api',
    changeOrigin: true
});
const scheduleProxy = createProxyMiddleware({
    target: 'http://localhost:3007/api',
    changeOrigin: true
});
const proxies = {
    residentProxy,
    birthProxy,
    deathProxy,
    weddingProxy,
    accountsProxy,
    postProxy,
    notificationProxy,
    scheduleProxy
}
module.exports = proxies;