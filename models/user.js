
const connection = require('../config/db.js');


const register = function(username, fname, lname, email, password) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO users (username, fname, lname, email, password, role) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(sql, [username, fname, lname, email, password, 'user'], (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        })
    });
};


// find a user given username
const find_user = function(username) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE username = ?';
        connection.query(sql, username, (err, results) => {
            if(err) reject(err);
            resolve(results);
        });
    });
};


// 

module.exports = { register, find_user };