const Product = require('../models/products');
const fs = require('fs');

exports.getAddProducts = (req, res, next) => {
    res.render('host/addProduct', { 
        edit: false,
        product: null,
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user
    });
}; 

exports.postAddProducts = (req, res, next) => {
    const { name, price, description, rating } = req.body;
    console.log(req.file);
    if(!req.file){
        return res.status(422).send('No image uploaded');
    }
    const image = req.file.path;
    const product = new Product({name, price, description, image, rating});
    product.save().then(() => {
        console.log("Product saved");
    }).catch(err => {
        console.error("Error saving product:", err);
    });
    res.redirect('/host/hostHome');
};

exports.getHostHome = (req, res, next) => {
    Product.find().then((registeredProducts)=>{
        res.render('host/hostHome', { registeredProducts,
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user
        });
    });
};

exports.getEditProduct = (req, res, next) =>{
    const productId = req.params.id;
    const edit = req.query.edit === 'true';
    Product.findById(productId).then((product)=>{
        if(!product){
            return res.redirect('/host/hostHome');
        }
        res.render('host/addProduct', { 
            product: product,
            edit: edit,
            isLoggedIn: req.session.isLoggedIn,
            user: req.session.user
        });
    });
}

exports.postEditProduct = (req, res, next) =>{ 
    const { id, name, price, description, rating } = req.body;
    Product.findById(id).then((product)=>{
        product.name = name;
        product.price = price;
        product.description = description;
        product.rating = rating;
        if(req.file){
            fs.unlink(product.image, (err)=>{
                if(err){
                    console.log("error in deleting image", err);
                }
            });
            product.image = req.file.path;
        }
        product.save().then((result)=>{
            console.log("updated product", result);
            res.redirect('/host/hostHome');
        }).catch(err =>{
            console.log("error in updating product", err);
            res.redirect('/host/hostHome');
        });
    }).catch((err)=>{ 
        console.log("error in finding product", err);
        res.redirect('/host/hostHome');
    });
};

exports.postRemoveProduct = (req, res, next) =>{
    const productId = req.params.id;
    Product.findByIdAndDelete(productId)
    .then(()=>{
        console.log("removed product");
        res.redirect('/host/hostHome');
    }).catch((err)=>{
        console.log("error in removing product", err);
    });
};