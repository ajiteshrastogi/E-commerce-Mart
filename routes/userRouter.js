const express = require('express');
const userRouter = express.Router();

const storeController = require('../controllers/storeController');

userRouter.get('/', storeController.getProducts);
userRouter.get('/favourites', storeController.getFavourites);
userRouter.get('/product/:id', storeController.getProductDetail);
userRouter.post("/favourites", storeController.addFavourite);
userRouter.post("/favourites/remove/:id", storeController.postRemoveFavourite);
userRouter.get('/cart', storeController.getCart);
userRouter.post('/cart', storeController.postCart);
userRouter.post('/cart/remove/:id', storeController.postRemoveFromCart);
userRouter.post('/cart/update-quantity', storeController.postUpdateCartQuantity);

module.exports = userRouter;