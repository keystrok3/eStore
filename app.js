
require('dotenv').config({ path: './.env'});

const express = require('express');

const session = require('express-session');


// Session store
let RedisStore = require('connect-redis')(session);


// middleware
const { isAdmin, isUser } = require('./middleware.js');


// Globals
const SESSION_NAME = process.env.SESS_NAME;
const PORT = process.env.PORT;



// Redis store config
const { createClient } = require('redis');
let redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

const app = express();

// middleware to parse application/json request bodies
app.use(express.json())


// middleware for user session
app.use(session({
    store: new RedisStore({ client: redisClient }),
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


// do a session check for redis auto-reconnects
// app.use(function(req, res, next) {
//     if(!req.session) {
//         return next(new Error("Session expired"));
//     }
//     next();
// });

// auth routes
app.post('/register', require('./routes/auth.js'));
app.get('/verifyuser/:token', require('./routes/auth.js'));
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