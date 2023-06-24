require('dotenv').config();
const express = require('express');
const controllers = require('./apiControllers');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/verify/:id', controllers.verifyPayment);
app.use('/api/pay', controllers.postTransactionData, controllers.verifyPayment, controllers.success);
app.use('/api/success', controllers.success);

app.listen(process.env.PORT, () => {
    console.log('Server running...');
});