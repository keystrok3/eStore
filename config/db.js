
const mysql = require('mysql2');

// create connection to db
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD    
});


module.exports = connection;