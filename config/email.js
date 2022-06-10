const nodemailer = require('nodemailer');

// ADMIN EMAIL and PASSWORD
const user = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;


exports.transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: user,
        pass: password
    }
});