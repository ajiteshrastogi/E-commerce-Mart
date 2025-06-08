const express = require('express');
const hostRouter = express.Router();
const hostController = require('../controllers/hostController');

// Route to display the add product form
hostRouter.get('/add-product', hostController.getAddProducts);

// Route to handle form submission
hostRouter.post('/add-product', hostController.postAddProducts);
hostRouter.get('/hostHome', hostController.getHostHome);
hostRouter.get('/editProduct/:id', hostController.getEditProduct);
hostRouter.post('/editProduct/:id', hostController.postEditProduct);
hostRouter.post('/removeProduct/:id', hostController.postRemoveProduct);

module.exports = hostRouter;