
const express = require('express');

const router = express.Router();

const { register, login, logout } = require('../controllers/auth.js');


// register new user
router.route('/register').post(register);

// login user
router.route('/login').post(login);


// log out
router.route('/logout').get(logout);



module.exports = router;