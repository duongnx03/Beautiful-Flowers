const express = require('express');

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const adminRouter = require('./adminRouter');

const rootRouter = express.Router();
rootRouter.use('/user', userRouter);
rootRouter.use('/product', productRouter);
rootRouter.use('/admin', adminRouter);

module.exports = rootRouter;