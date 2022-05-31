const express = require('express');
const ProductController = require('../controller/product.controller');

const router = express.Router();

router.post('/add', ProductController.addProduct);
router.post('/get', ProductController.getProducts);
router.post('/update', ProductController.updateProduct);
router.post('/delete', ProductController.deleteProduct);

module.exports = router;