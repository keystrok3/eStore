const db = require('../models/admin.js');




const makeAdmin = async (req, res) => {
    const { username } = req.body;
    try {
        let admin = await db.make_admin(username);
        res.json({ msg: 'Admin set'});
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

const revokeAdmin = async (req, res) => {
    const { username } = req.body;

    try {
        let revoke = await db.revoke_admin(username);
        res.json({ msg: 'Admin revoked'});
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};


// create product category
const createCategory = async (req, res) => {
    const { name } = req.body;
    console.log(name);
    try {
        let category = await db.create_category(name);
        console.log(category);
        res.json({ msg: 'Product Category Created' });
    } catch (error) {
        console.error(error);
        res.json({ msg: "Something went wrong" }).sendStatus(500);
    }
};



module.exports = { makeAdmin, revokeAdmin, createCategory };