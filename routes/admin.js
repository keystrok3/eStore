const express = require('express');
const { 
    makeAdmin, 
    revokeAdmin, 
    createCategory, 
    createNewProduct, 
    setUnitPrice, 
    purchaseStock
} = require('../controllers/admin.js');


const router = express.Router();


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