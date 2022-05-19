/**
 * eStore Customer models
 * */ 


const connection = require('../config/db.js');

// buy a product
const buy_product = function(product_id) {
    return new Promise((resolve, reject) => {
        connection.execute()
    });
}
