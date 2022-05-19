const isAdmin = require('../middleware.js');
const express = require('express');
const { makeAdmin, revokeAdmin, createCategory } = require('../controllers/admin');
const router = express.Router();


router.use(isAdmin);

// make a user an admin
router.route('/makeadmin').put(makeAdmin);

// revoke admin 
router.route('/revokeadmin').put(revokeAdmin);

// create product category
router.route('/createcategory').post(createCategory);


module.exports = router;