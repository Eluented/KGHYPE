const express = require('express');
const CustomerController = require('../controller/customer.controller');

const router = express.Router();

router.post('/add', CustomerController.addCustomer);
router.post('/get', CustomerController.getCustomers);
router.post('/update', CustomerController.updateCustomer);
router.post('/delete', CustomerController.deleteCustomer);

module.exports = router;