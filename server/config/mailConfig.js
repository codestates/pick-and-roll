const dotenv = require('dotenv')
const nodeMailer = require('nodemailer')
dotenv.config()

const smtpTransport = nodeMailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = smtpTransport