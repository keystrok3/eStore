
const connection = require('../config/db.js');


const register = function(username, fname, lname, email, password, token) {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO users (username, fname, lname, email, password, role, \
             status, confirmationToken) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        connection.query(sql, [username, fname, lname, email, password, 'user', 'pending', token], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    });
};


// find a user given username
const find_user = function(username) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE username = ?';
        connection.query(sql, [username], (err, results) => {
            if(err) return reject(err);
            
            resolve(results, () => console.log('success'));
        });
    });
};


// find a user by confirmation code
const find_user_by_confirmation = function(confirmationToken) {
    console.log('DB log: ', confirmationToken)
    return new Promise((resolve, reject) => {
        const sql = 'SELECT username, confirmationToken FROM users WHERE confirmationToken = ?';
        connection.query(sql, [confirmationToken], (err, results) => {
            if(err) return reject(err);
            return resolve(results);
        }); 
    });
};


// change user status to active
const change_status = function(username) {
    console.log('Changing status')
    return new Promise((resolve, reject) => {
        const sql = "UPDATE users SET status = 'active' WHERE username = ?";
        connection.query(sql, [username], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

module.exports = { register, find_user, find_user_by_confirmation, change_status };