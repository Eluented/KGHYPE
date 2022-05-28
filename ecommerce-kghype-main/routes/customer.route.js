const express = require('express');
const CustomerController = require('../controller/customer.controller');
const { ADD_PREFIX, GET_PREFIX, UPDATE_PREFIX, DELETE_PREFIX } = require('../configs/app-config');

const router = express.Router();

router.post(ADD_PREFIX, CustomerController.addCustomer);
router.post(GET_PREFIX, CustomerController.getCustomers);
router.post(UPDATE_PREFIX, CustomerController.updateCustomer);
router.post(DELETE_PREFIX, CustomerController.deleteCustomer);

module.exports = router;