const User = require('../models/User');

const registerUser = async (req, res) => {
    const { name, email, password, age, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const errors = { email: 'Email đã tồn tại' };
            return res.render('register', { errors, data: req.body });e
        } else {
            const user = new User({ name, email, password, age, role });
            await user.save();
            req.session.user = user;
            res.redirect('/user/login');
        }
    } catch (err) {
        console.error(err);
        res.render('register', { error: 'Đăng ký thất bại', data: req.body });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && user.comparePassword(password)) {
        // Mật khẩu khớp và người dùng tồn tại trong cơ sở dữ liệu, chuyển hướng đến trang danh sách
        req.session.user = user;
        res.redirect('/user/list');
    } else {
        // Mật khẩu không khớp hoặc người dùng không tồn tại, hiển thị thông báo lỗi
        res.render('login', { error: 'Đăng nhập thất bại', data: req.body });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.render('list', { users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi lấy danh sách người đăng ký');
    }
}

module.exports = { registerUser, loginUser, getAllUsers };
