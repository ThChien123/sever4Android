//bắt lỗi

//bắt lỗi api đăng ký
const checkRegister = async (req, res, next) => {
    try {
        const { email, password, name, confirm_password } = req.body;
        if (!email || !password || !name || !confirm_password) {
            return res.status(400).json({
                result: false,
                message: 'Vui lòng nhập đầy đủ thông tin'
            });
        } else {
            if (password.toString() !== confirm_password.toString()) {
                return res.status(400).json({
                    result: false,
                    message: 'Mật khẩu không khớp'
                });
            }
            let emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    result: false,
                    message: 'Email không hợp lệ'
                });
            }
            let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({
                    result: false,
                    message: 'Mật khẩu phải có ít nhất 8 ký tự, chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
                });
            }
            //chạy tiếp
            next();
        }
    } catch (e) {
        console.log('Check register error:', e);
        return res.status(400).json({ result: false, message: 'Lỗi hệ thống' });
    }

};

module.exports = { checkRegister };