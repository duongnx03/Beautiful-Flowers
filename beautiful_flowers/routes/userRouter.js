const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers } = require('../controller/userController');

router.get('/register', (req, res) => {
    res.render('register', { data: null, error: null });
});

router.post('/register', registerUser);

router.get('/login', (req, res) => {
    res.render('login', { data: null, error: null });
});

router.post('/login', loginUser);

router.get('/list', getAllUsers);

module.exports = router;
