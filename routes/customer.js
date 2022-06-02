const express = require('express');
const { buyProduct } = require('../controllers/customer.js');

const router = express.Router();


router.route('/buyitem').post(buyProduct);

module.exports = router;