const fs = require('fs');
const Product = require('../models/Product');

const getAllProduct = async (req, res) => {
    const products = await Product.find({});
    res.render('list', { products });
}

const getFormCreate = (req, res) => {
    res.render('create', { data: null, errors: null });
}

const createProduct = async (req, res) => {
    const { name, price, quantity, description} = req.body; // Sử dụng cú pháp đúng để lấy dữ liệu từ req.body
    const imageUrl = req.file ? `/upload/${req.file.filename}` : '';
    const dataSubmit = {
        name: name,
        price: price,
        quantity: quantity,
        description: description,
        image: imageUrl
    };
    try {
        const result = await Product.create(dataSubmit);
        req.session.message = "Product created successfully";
        res.redirect('/product');
    } catch (err) {
        let errors = {};
        if (err.name === 'ValidationError') {
            for (const field in err.errors) {
                errors[field] = err.errors[field].message;
            }
            res.render('create', { errors, data: dataSubmit });
        }
    }
}

const getFromEdit = async(req, res)=>{
    const {id} = req.params;
    
    await Product.findById(id)
        .then(result =>{
            console.log(result);
            res.render('edit', {errors: null, data: result});
        })
        .catch(err => {
            res.redirect("/product");
        })
}

const editProduct = async(req, res)=>{
    let {id, name, price, description, quantity, current_image} = req.body;
    let imageUrl;
    if(req.file){
        imageUrl = `/upload/${req.file.filename}`;
    }else{
        imageUrl = current_image;
    }
    const dataSubmit = {
        id : id,
        name: name,
        price: price,
        quantity: quantity,
        description: description,
        image: imageUrl
    }
    console.log(dataSubmit);
    const opts = {runValidator: true};
    await Product.findByIdAndUpdate(id, dataSubmit)
    //await Product.updateOne({}, dataSubmit, opts)
    .then(result =>{
        req.session.message = 'Product updated successfully';
        res.redirect('/product');
    })
    .catch(err =>{
        let errors = {};
        if (err.name === 'ValidationError') {
            for (const field in err.errors) {
                errors[field] = err.errors[field].message;
            }
            res.render('edit', { errors, data: dataSubmit });
        }
    })
}

const deleteProduct = async(req, res)=>{
    const {id} = req.params;
    await Product.findByIdAndDelete(id)
        .then(result => {
            if (result) { // Kiểm tra xem result có tồn tại
                if (result.image !== '') {
                    try {
                        fs.unlinkSync('./beautiful_flowers/public/' + result.image); // xóa file vật lý
                    } catch (err) {
                        console.log(err);
                    }
                }
                req.session.message = 'Product deleted successfully';
            } else {
                req.session.message = 'Product not found'; // Xử lý trường hợp không tìm thấy sản phẩm
            }
            res.redirect('/product');
        })
        .catch(err => {
            console.log('err delete: ', err);
        });
}

module.exports = { getAllProduct, getFormCreate, createProduct, getFromEdit, editProduct, deleteProduct };
