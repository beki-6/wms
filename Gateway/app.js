const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const cors = require('cors');
const {authenticateToken, requireRole} = require('./auth');
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
  }

const app = express();
const indexRouter = require('./routes/index');
const request = require('./routes/request');
const {residentProxy} = require('./proxy/proxies');
const {birthProxy} = require('./proxy/proxies');
const {deathProxy} = require('./proxy/proxies');
const {weddingProxy} = require('./proxy/proxies');
const {accountsProxy} = require('./proxy/proxies');
const {postProxy} = require('./proxy/proxies');
const {notificationProxy} = require('./proxy/proxies');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.use('/resident', authenticateToken, residentProxy);
app.use('/id', authenticateToken, residentProxy);
app.use('/birth', authenticateToken, requireRole(['Admin', 'VEP']), birthProxy);
app.use('/death', authenticateToken, requireRole(['Admin', 'VEP']), deathProxy);
app.use('/wedding', authenticateToken, requireRole(['Admin', 'VEP']), weddingProxy);
app.use('/account', accountsProxy);
app.use('/users/login', authenticateToken, accountsProxy);
app.use('/login', accountsProxy);
app.use('/post', authenticateToken, requireRole(['Admin']), postProxy);
app.use('/stat', authenticateToken, postProxy);
app.use('/notification', notificationProxy);

app.use('/request', request);
app.use('/', indexRouter);

app.listen(4000, () => {
    console.log('Server running...');
});
