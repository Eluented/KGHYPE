const express = require('express');
const router = express.Router();

const userController = require('../controller/users.controller');

router.route('/signup')
    .post(userController.signUp)

router.route('/login')
    .post(userController.signIn)
    .put(userController.update)

// router.route('/logout')
//     // idk jwt

module.exports = router;