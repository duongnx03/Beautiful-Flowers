const express = require('express');
const { getAllProduct, getFormCreate, createProduct, getFromEdit, editProduct, deleteProduct } = require('../controllers/productController');

const upload = require('../controllers/middleware/uploadFile');

const productRouter = express.Router();

productRouter.get('/admin/list', async (req, res) => {
    const products = await getAllProduct();
    res.render('admin/list', { products, layout: 'admin/adminLayout' });
});

productRouter.get('/admin/create', getFormCreate);
productRouter.post('/admin/create', upload.single('image'), createProduct);
productRouter.get('/admin/edit/:id', getFromEdit);
productRouter.post('/admin/edit/:id', upload.single('image'), editProduct);
productRouter.get('/admin/delete/:id', deleteProduct);

productRouter.get('/products', async (req, res) => {
    try {
      const products = await getAllProducts();
      res.render('product', { products }); // Chuyển danh sách sản phẩm vào template
    } catch (error) {
      console.error('Error handling products:', error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = productRouter;
