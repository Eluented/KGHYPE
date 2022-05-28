// importing the dependencies
const express = require('express');
const userRoute = require('../routes/user.route');
const adminRoute = require('../routes/admin-main.route');
const { USER_PREFIX, ADMIN_PREFIX } = require('../configs/app-config');
const DB = require('../configs/database');
const env = require('../configs/env-configs')

// Env config
env.config();
// DB Connect
DB.connect();

env.provider.use(USER_PREFIX, userRoute);
env.provider.use(ADMIN_PREFIX, adminRoute);

// starting the server
env.provider.listen(3001, () => {
  console.log('listening on port 3001');
});