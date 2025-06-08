const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer');
require('dotenv').config();

const DB_URL = process.env.MONGODB_URI;
const store = new MongoDBStore({
    uri: DB_URL,
    collection: 'sessions'
}); 

const randomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for(let i = 0; i < length; i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;  
}
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/');
    },
    filename: (req, file, cb)=>{
        cb(null, randomString(10) + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb)=>{
    if(file.mimetype.startsWith('image/')){
        cb(null, true);
    }else{
        cb(new Error('Invalid file type. Only images are allowed.'), false);
    }
}
const userRouter = require('./routes/userRouter');
const hostRouter  = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter');
const errorController = require('./controllers/error');

const app = express();
// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/host/uploads', express.static(path.join(__dirname, 'uploads')));


//This is done as like in case public, things inside public will be served like they are in the root folder
//and the url does not have public in it.
//Here also either remove/ uploads from the image path or add the qulafier like /uploads/image.jpg
app.use(multer({storage, fileFilter}).single('image'));

// Middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
}));
app.use((req, res, next) => {
    req.isLoggedIn = req.session.isLoggedIn;
    next();
});
app.use(authRouter);
app.use(userRouter);
app.use('/host', (req, res, next) => {
    // For now, we'll set isLoggedIn to false by default
    // In a real application, you would check for a valid session or token here
    if(req.isLoggedIn){
        next(); 
    }else{
        res.redirect('/login');
    }
});

// as we can also redirect to the host page or its url without login
// here if remember the url and redirect to the same url without login
// then is will redirect login page
app.use('/host', hostRouter);


app.use(errorController.get404);

// Start server and connect to MongoDB
const port = process.env.PORT || 3333;

mongoose.connect(DB_URL)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log(`Server running on address http://localhost:${port}`);
    });
}).catch((err)=>{
    console.log("Error connecting to MongoDB", err);
})
