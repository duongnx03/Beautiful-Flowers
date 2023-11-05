const express = require('express');
const {getAllProduct, getFormCreate, createProduct,getFromEdit, editProduct, deleteProduct} = require('../controllers/productController');

const upload = require('../controllers/middleware/uploadFile');

const productRouter = express.Router();
productRouter.get('/', getAllProduct);
productRouter.get('/create', getFormCreate);
productRouter.post('/create',upload.single('image') , createProduct);
productRouter.get('/edit/:id', getFromEdit);
productRouter.post('/edit/:id', upload.single('image') , editProduct);
productRouter.get('/delete/:id', deleteProduct);

module.exports = productRouter;