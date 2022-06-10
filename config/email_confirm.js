const { transport } = require("./email")

// send email to registered user to confirm their identity
const sendConfirmationEmail = function(name, email, confirmationCode) {
    transport.sendMail({
        from: process.env.ADMIN_EMAIL,
        to: email,
        subject: "Please Confirm Your Account",
        port: 587,
        html: `
        <div>
        <h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:5500/verifyuser/${JSON.parse(confirmationCode)}> Click here</a>
        </div>
        `
    }).catch(err => console.error(err));
}


module.exports = { sendConfirmationEmail };