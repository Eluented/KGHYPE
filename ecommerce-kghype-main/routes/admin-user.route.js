const express = require('express');
const router = express.Router();
const UserController = require('../controller/admin-user.controller');

router.post('/login', UserController.signIn);

module.exports = router;