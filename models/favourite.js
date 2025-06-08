const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Favourite', favouriteSchema);
