var express = require('express');
var router = express.Router();
const userController = require('../components/users/UserController');
const jwt = require('jsonwebtoken');
const auth = require('../middle/Authen');

//1
//http://localhost:3000
router.get('/', [auth.authenWeb], function (req, res, next) {
    //hiển thị trang chủ
    res.render('index', { title: 'index' });

});
//2
//http://localhost:3000/login
router.get('/login', [auth.authenWeb], function (req, res, next) {
    //hiển thị trang login
    res.render('user/login', { title: 'Login' });
});

//http://localhost:3000/login
router.post('/login', [auth.authenWeb], async function (req, res, next) {
    //hiển thị trang login
    //nếu đăng nhập thành công thì chuyển hướng về trang chủ
    //ngược lại thì vẫn ở trang login
    const { email, password } = req.body;
    const result = await userController.login(email, password);
    if (result) {
        // lưu thông tin vào session
        const token = jwt.sign({ _id: result._id, role: result.role}, 'secret');
        req.session.token = token;
        return res.redirect('/cpanel/product');
    } else {
        return res.redirect('/login');
    }

});

//http://localhost:3000/logout
router.get('/logout', [auth.authenWeb], function (req, res, next) {
    //xử lý logout 
    //chuyển sang mà hình logout 
    req.session.destroy();
    req.redirect('/login');
});

//3
//http://localhost:3000/chart
router.get('/chart', function (req, res, next) {
    //hiển thị trang chart
    res.render('chart/chart', { title: 'chart' });
});



//4
//http://localhost:3000/new
router.get('/new', function (req, res, next) {
    //hiển thị trang new
    res.render('product/new', { title: 'new' });
});

//5
//http://localhost:3000/detail
router.get('/detail', function (req, res, next) {
    //hiển thị trang detail
    res.render('detail/detail', { title: 'detail' });
});





module.exports = router;
//yvdcbklhffpbojvu