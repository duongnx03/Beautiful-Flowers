const {Schema, default:mongoose} = require('mongoose');
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [5, 'min is 5'],
        max: [500, 'max is 500']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'min is 1'],
        max: [100, 'max is 100']
    },
    description:{
        type: String,
        required: [true, 'Description is required']
    },
    image: {
        type: String,
        validate: { 
            validator: function (v){
                return /\.(jpg|jpeg|png)$/i.test(v);
            },
            message: (props) => `${props.value} allow type: jpq, jpeg, png`
        },   
        required: [true, 'Image is required']   
    },
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;