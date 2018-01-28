import nodemailer from 'nodemailer';
const smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'Gmail',
    auth: {
        user: 'questionapp613@gmail.com',
        pass: 'crypticpassword123',
    },
});

export default (to, subject, message) =>
    smtpTransport.sendMail({
        from: 'questionapp613@gmail.com',
        to,
        subject,
        text: message,
    });
