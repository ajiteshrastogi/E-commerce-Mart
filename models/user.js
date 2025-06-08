const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    userType: {
        type: String,
        enum: ['guest', 'host'],
        default: 'guest',
    },
    favourites:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;  