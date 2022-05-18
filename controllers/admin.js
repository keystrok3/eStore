const db = require('../models/admin.js');




const make_admin = async (req, res) => {
    const { username } = req.body;
    try {
        let admin = await db.make_admin(username);
        res.json({ msg: 'Admin set'});
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

const revoke_admin = async (req, res) => {
    const { username } = req.body;

    try {
        let revoke = await db.revoke_admin(username);
        res.json({ msg: 'Admin revoked'});
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};



module.exports = { make_admin, revoke_admin };