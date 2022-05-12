
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

module.exports = { make_admin, revoke_admin };