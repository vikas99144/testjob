
const nodemailer = require('nodemailer');


module.exports.send = (to, data, callback) => {
    var mailOptions;
    const mailTransporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: false,
        port: 587,
        auth: {
            user: "vk40010@gmail.com",
            pass: "vikas@12345"
        }
    })
    
    mailOptions = {
        from: "vk40010@gmail.com",
        to: to,
        html: `<html>
            <br> Please Click on the link to verify your email.<br>
            <a href='${data.url}'>${data.url}</a>
            </html>`
    }

    mailTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            callback("false");
        } else {
            callback("true");
        }

    });

}

