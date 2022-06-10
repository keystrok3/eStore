
const express = require('express');

const router = express.Router();

const { register, login, logout, verifyUser } = require('../controllers/auth.js');


// register new user
router.route('/register').post(register);

// verify user email
router.route('/verifyuser/:token').get(verifyUser);

// login user
router.route('/login').post(login);


// log out
router.route('/logout').get(logout);



module.exports = router;