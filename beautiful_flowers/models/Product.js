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
    description:{
        type: String,
        required: [true, 'Name is required']
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