const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: function (email) {
                const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
                return emailRegex.test(email);
            },
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
            validator: function (password) {
                return password.length >= 8;
            },
            message: 'Password must be at least 8 characters long',
        },
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [10, 'Min age is 10'],
        max: [60, 'Max age is 60'],
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        validate: {
            validator: function (role) {
                const validRoles = ['user', 'admin'];
                return validRoles.includes(role);
            },
            message: 'Invalid role',
        },
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

const User = model('User', userSchema);
module.exports = User;
