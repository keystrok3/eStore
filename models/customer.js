/**
 * eStore Customer models
 * */ 


const connection = require('../config/db.js');

// Check that the product is in stock
const check_product = function(product_id) {
    return new Promise((resolve, reject) => {
        return connection.query(
            'SELECT quantity FROM products WHERE product_id = ?',
            [ product_id ],
            (err, results) => {
                if(err) reject(err);
                resolve(results);
            }
        );
    });
};


// buy a product: -->
// Decrease quantity in products, record sales
const buy_product = function(product_id, quantity, unit_price, username) {
    return new Promise((resolve, reject) => {
        
        const record_sale_sql = 'INSERT INTO sales (sale_id, product_id, quantity, unit_price, sale_date, username) \
                                        VALUES (NULL, ?, ?, ?, NULL, ?)';


        // transaction for the db writes described by the above sql statements.
        connection.beginTransaction((err) => {
            if(err) return reject(err);
            
            connection.query(
                record_sale_sql,
                [product_id, quantity, unit_price, username],
                (err) => {
                    if(err) {
                        return connection.rollback(() => {
                            return reject(err);
                        });
                    };
                    return connection.query(
                        `UPDATE products SET quantity = quantity - ${quantity} WHERE product_id = "${product_id}"`,
                        (err, results) => {
                            if(err) {
                                connection.rollback(() => {
                                    return reject(err);
                                });  // rollback previous db write in case of error  
                            }
                            return connection.commit((err) => {
                                if(err) {
                                    return connection.rollback(() => {
                                        return reject(err)
                                    });
                                }
                                return resolve(results);
                            })
                        }
                    );
                }
            );
        });
    });
};


const get_products_of_category = function(category_id) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM products WHERE category_id = ?',
            [ category_id ],
            (err, results) => {
                if(err) reject(err);
                resolve(results);
            }
        );
    });
}


const get_specific_product = function(product_id) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM products WHERE product_id = ?',
            [ product_id ],
            (err, results) => {
                if(err) reject(err);
                resolve(results);
            }
        )
    });
}

module.exports = { 
    buy_product, 
    check_product, 
    get_products_of_category, 
    get_specific_product 
};