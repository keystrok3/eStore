
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


module.exports = { buyProduct };