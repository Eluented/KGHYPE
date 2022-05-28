const express = require('express');
const ProductController = require('../controller/product.controller');
const { ADD_PREFIX, GET_PREFIX, UPDATE_PREFIX, DELETE_PREFIX } = require('../configs/app-config');

const router = express.Router();

router.post(ADD_PREFIX, ProductController.addProduct);
router.post(GET_PREFIX, ProductController.getProducts);
router.post(UPDATE_PREFIX, ProductController.updateProduct);
router.post(DELETE_PREFIX, ProductController.deleteProduct);

module.exports = router;