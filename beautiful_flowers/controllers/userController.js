const User = require('../models/User');
const nodemailer = require('nodemailer');
function sendRegistrationEmail(email) {
    const transporter = nodemailer.createTransport({
        // Configure your email service settings here
        service: 'Gmail', // e.g., 'Gmail', 'Outlook', etc.
        auth: {
            user: 'phamphudien601@gmail.com', // Your email address
            pass: 'pjsn qedu sdzc wqbp' // Your email password
        }
    });

    const mailOptions = {
        from: 'phamphudien601@gmail.com', // Sender's email address
        to: email, // Recipient's email address (the registered user's email)
        subject: 'Registration Successful',
        text: 'Thank you for registering! Your registration was successful.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending registration email: ' + error);
        } else {
            console.log('Registration email sent: ' + info.response);
        }
    });
}
const registerUser = async (req, res) => {
    const { name, email, password, age, phone } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const errors = { email: 'Email đã tồn tại' };
            return res.render('register', { errors, data: req.body });
        } else {
            // Remove password hashing
            const user = new User({ name, email, password, age, phone });
            await user.save();

            // Send registration notification email
            sendRegistrationEmail(email);

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

    if (user) {
        console.log('User found:', user);
        const passwordMatch = await user.comparePassword(password);
        console.log('Password match:', passwordMatch);
        if (passwordMatch) {
            req.session.user = user;
            res.redirect('/user/list');
        } else {
            console.log('Incorrect password');
            res.render('login', { error: 'Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.', data: req.body });
        }
    } else {
        console.log('User not found');
        res.render('login', { error: 'Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.', data: req.body });
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
