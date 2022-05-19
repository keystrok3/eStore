
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


// add stock to the inventory
// update new purchases records

module.exports = { make_admin, revoke_admin, create_category, create_new_product };