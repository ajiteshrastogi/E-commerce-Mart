const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,   
        required: true      
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    image: String,
    rating: {
        type: Number,
        required: true
    }                               
});

// productSchema.pre('findOneAndDelete', async function(next){
//     const productId = this.getQuery()._id;
//     await Favourite.deleteMany({productId: productId});
//     next();
// });

module.exports = mongoose.model('Product', productSchema);