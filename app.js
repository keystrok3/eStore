
const auth = require('./auth.js');
const express = require('express');

const session = require('express-session');
const SESSION_NAME = 'SESS_NAME';


const app = express();

// middleware to parse application/json request bodies
app.use(express.json())


// middleware for user session
app.use(session({
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: 'g1p&ms/ja!k',
    cookie: {
        maxAge: 7200000,
        sameSite: true,
        secure: false
    }
}));

// routes
app.post('/register', require('./auth.js'));
app.post('/login', require('./auth.js'));
app.get('/logout', require('./auth.js'));


// admin routes
app.put('/makeadmin', require('./admin'));
app.put('/revokeadmin', require('./admin'));



app.listen(5500, () => {
    console.log(`Listening at: http://127.0.0.1:${5500}`);
});