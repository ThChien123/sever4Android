const mailer = require('nodemailer');
const userService = require('./UserService');


const transporter = mailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'chienttps24584@fpt.edu.vn',
        pass: 'molvcthrcjnvnrlx'
    },
});

const login = async (email, password) => {
    return await userService.login(email, password);
};

const register = async (email, password, name) => {
    try {
        return await userService.register(email, password, name);
    } catch (error) {
        console.log(error);
    }

};

const sendMail = async (email, subject, content) => {
    try {
        const mailOptions = {
            from: 'Tran Thien Chien (FPL HCM_K17) <chienttps24584@fpt.edu.vn>',
            to: email,
            subject: subject,
            html: content,
        };
        return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log('Send mail error: ', error);
    }
};
module.exports = { login, register, sendMail };