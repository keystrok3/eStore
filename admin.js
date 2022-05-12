const db = require('./models/admin.js');
const express = require('express');
const isAdmin = require('./middleware.js');

const router = express.Router();


// make a user an admin
router.put('/makeadmin', isAdmin, async (req, res) => {
    const { username } = req.body;
    try {
        let admin = await db.make_admin(username);
        res.json({ msg: 'Admin set'});
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// revoke admin 
router.put('/revokeadmin', isAdmin, async (req, res) => {
    const { username } = req.body;

    try {
        let revoke = await db.revoke_admin(username);
        res.json({ msg: 'Admin revoke'});
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});


// create new product category
router.post('/newcategory', isAdmin, async (req, res) => {
    const { name } = req.body;

    try {
        // 
    } catch (error) {
        
    }
})


module.exports = router;