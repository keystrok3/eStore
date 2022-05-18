const isAdmin = require('../middleware.js');
const express = require('express');
const { make_admin, revoke_admin } = require('../models/admin.js');
const router = express.Router();


router.use(isAdmin);

// make a user an admin
router.route('/makeadmin').put(make_admin);

// revoke admin 
router.route('/revokeadmin').put(revoke_admin);


module.exports = router;