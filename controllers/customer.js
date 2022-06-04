
/**
 * Contains all the functions that provide the functionality for database access
 * for customers
*/


const db = require('../models/customer.js');


const buyProduct = async (req, res) => {

    const { product_id, quantity, unit_price, username } = req.body;

    try {
        const check = await db.check_product(product_id);
        if (check[0].quantity === 0) {
            return res.json({ msg: "Stock has run out" });
        }
        const buy = await db.buy_product(product_id, quantity, unit_price, username);
        res.json({ msg: "Items bought" });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

const list_products_of_category = async (req, res) => {
    const { category_id } = req.body;

    try {
        let prod_list = await db.get_products_of_category(category_id);
        if (prod_list.length === 0) {
            res.json({ msg: "Out of Stock" });
        }
        res.json({ products: prod_list });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};


const getProduct = async (req, res) => {
    const product_id = req.params.product_id;
      
    try {
        let prod = await db.get_specific_product(product_id);
        
        res.json({ msg: prod });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};


module.exports = { buyProduct, list_products_of_category, getProduct };