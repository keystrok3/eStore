
require('dotenv').config({ path: './.env'})

const express = require('express');

const session = require('express-session');


const SESSION_NAME = process.env.SESS_NAME;
const PORT = process.env.PORT;


const app = express();

// middleware to parse application/json request bodies
app.use(express.json())


// middleware for user session
app.use(session({
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
    cookie: {
        maxAge: 7200000,
        sameSite: true,
        secure: false
    }
}));

// auth routes
app.post('/register', require('./routes/auth.js'));
app.post('/login', require('./routes/auth.js'));
app.get('/logout', require('./routes/auth.js'));


// admin routes
app.put('/makeadmin', require('./routes/admin'));
app.put('/revokeadmin', require('./routes/admin'));
app.post('/createcategory', require('./routes/admin'));
app.post('/createnewproduct', require('./routes/admin'));
app.put('/setunitprice', require('./routes/admin'));
app.post('/purchasestock', require('./routes/admin'));



app.listen(5500, () => {
    console.log(`Listening at: http://127.0.0.1:${5500}`);
});