const userRoute = require('../routes/admin-user.route');
const productRoute = require('../routes/product.route');
const customerRoute = require('../routes/customer.route');

const express = require('express');
const app = express();

app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/customer', customerRoute);

module.exports = app;