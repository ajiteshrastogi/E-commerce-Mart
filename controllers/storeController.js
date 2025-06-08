const Product = require('../models/products');
const User = require('../models/user');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    console.log("session value", req.session);
    Product.find().then((registeredProducts)=>{
        res.render('store/home', { 
            registeredProducts,
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user
        });
    });
};


exports.getFavourites = async (req,res,next)=>{
    const userId = req.session.user._id;
    const user = await User.findById(userId).populate('favourites');
        res.render('store/favourites', { 
            favouriteProducts: user.favourites, 
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user
        });
};

exports.getProductDetail = (req, res, next) => {
    const productId = req.params.id;
    Product.findById(productId).then((product) => {
        if (!product) {
            console.log("product not found");
            return res.redirect('/store/home');
        }
        res.render('store/productDetail', { 
            product,
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user
        });
    });
};
    
exports.addFavourite = async (req, res, next) => {
    const productId = req.body.productId;
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    if(!user.favourites.includes(productId)){
        user.favourites.push(productId);
        await user.save();
    }
    res.redirect('/favourites');
};

exports.postRemoveFavourite = async (req, res, next) => {
    const productId = req.params.id;
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    if(user.favourites.includes(productId)){
        user.favourites = user.favourites.filter(fav => fav != productId);
        await user.save();
    }
    res.redirect('/favourites');
};

exports.getCart = async (req, res, next) => {
    try {
        const userId = req.session.user._id;
        let cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            cart = new Cart({ user: userId, items: [], totalPrice: 0 });
            await cart.save();
        }
        res.render('store/cart', {
            cart,
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user
        });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
};

exports.postCart = async (req, res, next) => {
    try {
        const productId = req.body.productId;
        const userId = req.session.user._id;
        
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [], totalPrice: 0 });
        }

        const existingItem = cart.items.find(item => 
            item.product.toString() === productId
        );
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({ product: productId, quantity: 1 });
        }
        const populatedCart = await cart.populate('items.product');
        cart.totalPrice = populatedCart.items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);

        await cart.save();
        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
};

exports.postRemoveFromCart = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const userId = req.session.user._id;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.redirect('/cart');
        }
        cart.items = cart.items.filter(item => 
            item.product.toString() !== productId
        );

        // Update total price
        const populatedCart = await cart.populate('items.product');
        cart.totalPrice = populatedCart.items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);

        await cart.save();
        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        res.redirect('/cart');
    }
};

exports.postUpdateCartQuantity = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.session.user._id;
        
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.redirect('/cart');
        }

        const cartItem = cart.items.find(item => 
            item.product.toString() === productId
        );

        if (cartItem) {
            cartItem.quantity = parseInt(quantity);
        }

        // Update total price
        const populatedCart = await cart.populate('items.product');
        cart.totalPrice = populatedCart.items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);

        await cart.save();
        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        res.redirect('/cart');
    }
};
