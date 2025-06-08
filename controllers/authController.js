const {check, validationResult} = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        isLoggedIn: false,
        errors: [],
        oldInput: {email: ''},
        user: {}
    });
};
exports.postLogin = async(req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(422).render('auth/login', {
            isLoggedIn: false,
            errors: ['Invalid email or password'],
            oldInput: {email},
            user: {}
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(422).render('auth/login', {
            isLoggedIn: false,
            errors: ['Invalid email or password'],
            oldInput: {email},
            user: {}
        });
    }
    req.session.isLoggedIn = true;
    req.session.user = user;
    await req.session.save();
    res.redirect('/');
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(()=>{
        res.redirect('/');
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        isLoggedIn: false,
        errors: [],
        oldInput: {firstName: '', lastName: '', email: '', password: '', confirmPassword: '', userType: '', terms: ''}, 
        user: {}
    });
};
exports.postSignup = [

    //express-validator
    check('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({min: 3})
    .withMessage('First name must be at least 3 characters long')
    .matches(/^[a-zA-Z]+$/)
    .withMessage('First name must contain only letters'),


    check('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .matches(/^[a-zA-Z]+$/)
    .withMessage('Last name must contain only letters'),

    check('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),

    check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({min: 8})
    .withMessage('Password must be at least 8 characters long')
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    // .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[@$!%*?&]/)
    .withMessage('Password must contain at least one special character'),

    check('confirmPassword')
    .trim()
    .notEmpty()
    .withMessage('Confirm password is required')
    .custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Passwords do not match');
        }
        return true;
    }),

    check('userType')
    .trim()
    .notEmpty()
    .withMessage('User type is required')
    .isIn(['guest', 'host'])
    .withMessage('Invalid user type'),

    check('terms')
    .trim()
    .notEmpty()
    .withMessage('Terms and conditions must be accepted')
    .custom((value, {req}) => {
        if (value !== "on") {
          throw new Error("Please accept the terms and conditions");
        }
        return true;
      }),
    
    
    
    (req, res, next) => {
    console.log('Signup POST body:', req.body);
    const {firstName, lastName, email, password, userType} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // Log all validation errors for debugging
        console.error('Validation errors:', errors.array());
        return res.status(422).render('auth/signup', {
            isLoggedIn: false,
            errors: errors.array().map(error => error.msg),
            oldInput: {firstName, lastName, email, password, userType, terms: req.body.terms},
            user: {}
        });
    }

    bcrypt.hash(password, 12).then(hashedPassword => {
        const user = new User({firstName, lastName, email, password: hashedPassword, userType});
        return user.save()
        .then(() => {
            res.redirect('/login');
        })
        .catch(err => {
            return res.status(422).render('auth/signup', {
                isLoggedIn: false,
                errors: [err.message],
                oldInput: {firstName, lastName, email, userType},
                user: {},
            }); 
        })
    })
}]