
require('dotenv').config({ path: './.env'})

const express = require('express');

const session = require('express-session');


// middleware
const { isAdmin, isUser } = require('./middleware.js');


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

/**
 * Route Handlers
 * */ 
// admin routes
app.put('/makeadmin', isAdmin, require('./routes/admin'));
app.put('/revokeadmin', isAdmin, require('./routes/admin'));
app.post('/createcategory', isAdmin, require('./routes/admin'));
app.post('/createnewproduct', isAdmin, require('./routes/admin'));
app.put('/setunitprice', isAdmin, require('./routes/admin'));
app.post('/purchasestock', isAdmin, require('./routes/admin'));

// customer routes
app.post('/buyitem', isUser, require('./routes/customer'));
app.get('/getproductlist', isUser, require('./routes/customer'));
app.get('/getproduct/:product_id', isUser, require('./routes/customer'));



app.listen(5500, () => {
    console.log(`Listening at: http://127.0.0.1:${5500}`);
});