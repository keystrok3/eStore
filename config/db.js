
const mysql = require('mysql2');

// create connection to db
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'eStoreDB',
    password: 'veritas'
});


module.exports = connection;