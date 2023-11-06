const express = require('express');

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');

const rootRouter = express.Router();
rootRouter.use('/user', userRouter);
rootRouter.use('/product', productRouter);

module.exports = rootRouter;