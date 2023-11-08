const express = require('express');
const {getAllProduct, getFormCreate, createProduct,getFromEdit, editProduct, deleteProduct} = require('../controllers/productController');

const upload = require('../controllers/middleware/uploadFile');

const productRouter = express.Router();
productRouter.get('/admin/list', getAllProduct);
productRouter.get('/admin/create', getFormCreate);
productRouter.post('/admin/create',upload.single('image') , createProduct);
productRouter.get('/admin/edit/:id', getFromEdit);
productRouter.post('/admin/edit/:id', upload.single('image') , editProduct);
productRouter.get('/admin/delete/:id', deleteProduct);

productRouter.get('/admin/list', (req, res) => {
    res.render('list', { products, layout: 'admin/adminLayout' });
  });
module.exports = productRouter;