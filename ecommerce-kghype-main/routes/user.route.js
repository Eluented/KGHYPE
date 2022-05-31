const express = require('express');
const router = express.Router();

const userController = require('../controller/users.controller');
const productRoute = require('../routes/product.route');

// took this off since its easier to read 
// const { SIGNUP_PREFIX, LOGIN_PREFIX, PRODUCT_PREFIX } = require('../configs/app-config');
// exports.SIGNUP_PREFIX = '/signup';
// exports.LOGIN_PREFIX = '/login';
// exports.PRODUCT_PREFIX = '/product';

router.route('/signup')
    .post(userController.signUp)

router.route('/login')
    .post(userController.signIn)
    .put(userController.update)

router.route('/logout')
    // idk jwt

router.route('/product')
    .use('/product', productRoute)

module.exports = router;