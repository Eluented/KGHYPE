const express = require('express');
const UserController = require('../controller/users.controller');
const productRoute = require('../routes/product.route');
const { SIGNUP_PREFIX, LOGIN_PREFIX, PRODUCT_PREFIX } = require('../configs/app-config');

const router = express.Router();

router.post(SIGNUP_PREFIX, UserController.signUp)
router.post(LOGIN_PREFIX, UserController.signIn)
router.use(PRODUCT_PREFIX, productRoute)

module.exports = router;