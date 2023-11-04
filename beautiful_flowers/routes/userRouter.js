const express = require('express');

const { getFormRegister, registerUser, getFormLogin,checkLogin } = require('../controllers/userControllers');


const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.get('/register', getFormRegister);

userRouter.get('/login', getFormLogin);

userRouter.post('/login', checkLogin);


module.exports = userRouter;
