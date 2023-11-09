const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (password) {
                // Password must be at least 8 characters long
                return password.length >= 8;
            },
            message: 'Password must be at least 8 characters long.',
        },
        maxlength: [50, 'Password must not exceed 50 characters.'],
    },
    age: {
        type: Number,
        required: true,
        validate: {
            validator: function (age) {
                // Age must be 16 or greater
                return age >= 16;
            },
            message: 'Age must be 16 or greater.',
        },
    },
    phone: {
        type: Number,
        required: true
    },
});

// Remove the password hashing middleware

userSchema.methods.comparePassword = async function (password) {
    return password === this.password; 
};

const User = model('User', userSchema);
module.exports = User;
