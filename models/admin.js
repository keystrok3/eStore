
const connection = require('../config/db.js');

// change user role
const make_admin = function(username) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE users SET role = "admin" WHERE username = ?';
        connection.query(sql, username, (err, results) => {
            if(err) reject(err);
            resolve(results);
        });
    });
};


// revoke user's admin privilege
const revoke_admin = function(username) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE users SET role = "user" WHERE username = ?';
        connection.query(sql, username, (err, results) => {
            if(err) reject(err);
            resolve(results);
        });
    });
};


// create new product category
const create_category = function(name) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO product_categories (category_id, name) VALUES (NULL, ?)';
        connection.query(sql, name, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    })
};

// create new product
const create_new_product = function(name, unit_price, quantity, category_id) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO products (product_id, name, unit_price, quantity, category_id) \
                        VALUES (UUID(), ?, ?, ?, ?)';
        connection.query(sql, [name, unit_price, quantity, category_id], (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });
};

// set new unit price for product
const set_unit_price = function(product_id, unit_price) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE products SET unit_price = ? WHERE product_id = ?';
        connection.query(sql, [unit_price, product_id], (err, results) => {
            if(err) reject(err);
            resolve(results);
        });
    });
};


// add stock to the inventory
// update new purchases records
const purchase_stock = function(product_id, quantity, unit_price) {
    const sql1 = 'INSERT INTO purchases (purchase_id, product_id, quantity, unit_price, delivery_date) \
                        VALUES (NULL, ?, ?, ?, NULL)';
    return new Promise((resolve, reject) => {
        connection.execute(
            sql1,
            [product_id, quantity, unit_price],
            (err) => {
                if(err) {
                    return reject(err);
                }
                return connection.execute(
                    `UPDATE products SET quantity = quantity + ${quantity} WHERE product_id = "${product_id}"`,
                    (err, results) => {
                        if(err) {
                            connection.rollback();  // rollback previous db write in case of error
                            return reject(err);
                        }
                        return resolve(results);
                    }
                );
            });
    });
}

module.exports = { 
    make_admin, 
    revoke_admin, 
    create_category, 
    create_new_product, 
    set_unit_price,
    purchase_stock
};