const express = require('express');
const { USER_PREFIX, PRODUCT_PREFIX, CUSTOMER_PREFIX } = require('../configs/app-config');
const userRoute = require('../routes/admin-user.route');
const productRoute = require('../routes/product.route');
const customerRoute = require('../routes/customer.route');

const app = express();

app.use(USER_PREFIX, userRoute);
app.use(PRODUCT_PREFIX, productRoute);
app.use(CUSTOMER_PREFIX, customerRoute);

module.exports = app;