

const bcrypt = require('bcrypt');   // for hashing passwords
const db = require('../models/user.js');

const register = async (req, res) => {
    const { fname, lname, email, username, password } = req.body;
    try {
        let password_hash = await bcrypt.hash(password, 10);    // encrypt the password

        let results = await db.register(username, fname, lname, email, password_hash);   //password is not stored in plaintext
        console.log(results);
        res.json({ msg: 'Done'});
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};


const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // check that a user with that username exists
        let user = await db.find_user(username);
        console.log(user);
        if (!user[0]) {
            return res.json({ msg: "Wrong username"});
        }

        // check that the password is correct
        let isValidPassword = await bcrypt.compare(password, user[0].password);
        if (!isValidPassword) {
            return res.json({ msg: "Wrong password"});
        }

        // add user details to session
        req.session.user = user[0].username;
        req.session.role = user[0].role;
        
        res.status(201).json({ msg: "success"});
    } catch (error) {
        console.error(error);
        return res.json({ msg: 'Something went wrong'});
    }
};


const logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.json({ msg: "Log Out Unsuccessful"});
        } else {
            res.clearCookie('SESS_NAME');
            res.json({ msg: "Log out successful"})
        }
    });
};


module.exports = { register, login, logout };