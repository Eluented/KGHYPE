const express = require('express');
const UserController = require('../controller/admin-user.controller');
const { LOGIN_PREFIX } = require('../configs/app-config');

const router = express.Router();

router.post(LOGIN_PREFIX, UserController.signIn);

module.exports = router;