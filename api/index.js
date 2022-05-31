// importing the dependencies
const express = require('express');
const userRoute = require('./routes/user.route');
const adminRoute = require('./routes/admin-main.route');
const productRoute = require('./routes/product.route');
const DB = require('./configs/database');
const env = require('./configs/env-configs')

// Env config
env.config();
// DB Connect
DB.connect();
const port = process.env.PORT || 3001;

env.provider.use('/user', userRoute);
env.provider.use('/cp', adminRoute);
env.provider.use('/product', productRoute);

// starting the server
env.provider.listen(port, () => {
  console.log(`listening on port ${port}`);
});