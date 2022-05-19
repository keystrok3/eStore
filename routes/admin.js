const isAdmin = require('../middleware.js');
const express = require('express');
const { 
    makeAdmin, 
    revokeAdmin, 
    createCategory, 
    createNewProduct, 
    setUnitPrice, 
    purchaseStock
} = require('../controllers/admin');
const router = express.Router();


router.use(isAdmin);

// make a user an admin
router.route('/makeadmin').put(makeAdmin);

// revoke admin 
router.route('/revokeadmin').put(revokeAdmin);

// create product category
router.route('/createcategory').post(createCategory);

// create new product
router.route('/createnewproduct').post(createNewProduct);

// set unit price for product
router.route('/setunitprice').put(setUnitPrice);

// purchase stock
router.route('/purchasestock').post(purchaseStock);


module.exports = router;