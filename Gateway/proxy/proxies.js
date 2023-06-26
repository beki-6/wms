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
    changeOrigin: true,
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {
        // Forward the Content-Type header from the client request to the backend service
        if (req.headers["content-type"]) {
          proxyReq.setHeader("Content-Type", req.headers["content-type"]);
        }
        // Forward the Content-Length header from the client request to the backend service
        if (req.headers["content-length"]) {
          proxyReq.setHeader("Content-Length", req.headers["content-length"]);
        }
      },
      onError: (err, req, res) => {
        console.error('Error in proxy:', err);
        res.status(500).json({ message: 'Error occurred while proxying the request' });
      },
});
const postProxy = createProxyMiddleware({
    target: 'http://localhost:3005/api',
    changeOrigin: true
});
const notificationProxy = createProxyMiddleware({
    target: 'http://localhost:3006/api',
    changeOrigin: true
});
const proxies = {
    residentProxy,
    birthProxy,
    deathProxy,
    weddingProxy,
    accountsProxy,
    postProxy,
    notificationProxy
}
module.exports = proxies;