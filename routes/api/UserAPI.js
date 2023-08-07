const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../../components/users/UserController');
const validation = require('../../middle/Validation');
// http://localhost:3000/api/user/

//api đăng nhập
// http://localhost:3000/api/user/login
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userController.login(email, password);
        if (user) {
            const token = jwt.sign({ user }, 'secret',
                { expiresIn: '1h' }); //tạo token
            return res.status(200).json({ result: true, user: user, token });
        }
        return res.status(200).json({ result: false, user: null });
    } catch (error) {
        console.log(error);
        // next(error); chỉ chạy trên web
        return res.status(400).json({ result: false, user: null });
    }
});


//api đăng ký
// http://localhost:3000/api/user/register
router.post('/register', async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const result = await userController.register(email, password, name);
        let returnData = {
            "error": false,
            "responseTimestamp": new Date(),
            "statusCode": 200,
            "data": {},
        }
        return res.status(200).json(returnData);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ result: false });
    }
});


//api gửi email
// http://localhost:3000/api/user/sendmail
router.post('/sendmail', async (req, res, next) => {
    try {
        const { email, subject } = req.body;
        let content = `<h1>Chào bạn</h1>
        <p>Bạn đã đăng ký thành công</p>
        <p>Chúc bạn một ngày tốt lành</p>
        `;
        const result = await userController.sendMail(email, subject, content);
        return res.status(200).json({ result: result });
    } catch (error) {
        console.error('Send mail error: ', error);
        return res.status(500).json({ result: false });
    }
});


module.exports = router;