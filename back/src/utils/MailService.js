const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ktortrqnmhnyuimo@ethereal.email',
        pass: 'yQaJYUMFr5p8jnczKk'
    }
});

/**
 * mailOptions: {
        from: '"Fred Foo 👻" <foo@example.com>',
        to: 'bar@example.com, baz@example.com',
        subject: 'Hello ✔',
        text: 'Hello world?',
        html: '<b>Hello world?</b>'
    };
 */

export const sendMail = (from, to, subject, text, html) => {

    let mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });
}

export default {
    sendMail
}