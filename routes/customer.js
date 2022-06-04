const express = require('express');
const { buyProduct, list_products_of_category, getProduct } = require('../controllers/customer.js');

const router = express.Router();


router.route('/buyitem').post(buyProduct);

router.route('/getproductlist').get(list_products_of_category);

router.route('/getproduct/:product_id').get(getProduct);

module.exports = router;