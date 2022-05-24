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
    try {
        let category = await db.create_category(name);
        console.log(category);
        res.json({ msg: 'Product Category Created' });
    } catch (error) {
        console.error(error);
        res.json({ msg: "Something went wrong" }).sendStatus(500);
    }
};


// create new product
const createNewProduct = async (req, res) => {
    const { name, unit_price, quantity, category_id } = req.body;
    try {
        let product = await db.create_new_product(name, unit_price, quantity, category_id);
        console.log(product);
        res.json({ msg: 'Product created' });
    } catch (error) {
        console.error(error);
        res.json({ msg: "Something went wrong" }).sendStatus(500);
    }
};

// set unit price for a product
const setUnitPrice = async (req, res) => {
    const { product_id, unit_price } = req.body;

    try {
        let price = await db.set_unit_price(product_id, unit_price);
        console.log(price);
        res.json({ msg: 'Price set'});
    } catch (error) {
        console.error(error);
        res.json({ msg: "Something went wrong" }).sendStatus(500);
    }
};


// purchase stock
const purchaseStock = async (req, res) => {
    const { product_id, quantity, unit_price } = req.body;

    console.log(product_id);
    try {
        let stock = await db.purchase_stock(product_id, quantity, unit_price);
        console.log(stock);
        return res.json({ msg: 'Stock bought' });
    } catch (error) {
        console.error(error);
        return res.json({ msg: "Something went wrong" }).sendStatus(500);
    }
};



module.exports = { 
    makeAdmin, 
    revokeAdmin, 
    createCategory, 
    createNewProduct, 
    setUnitPrice,
    purchaseStock
};