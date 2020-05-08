var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Product = require('../models/product');

var csrfProtection = csrf();
router.use(csrfProtection);
  

//Logging out and get Home page
router.get('/logout', isLoggedIn, function(req, res, next){
    req.logOut();
    res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next){
    next()
});

//Signing up 
router.get('/signup', function(req, res, next){
    var messages = req.flash('error')
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0})
});
  
  
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

//Singning in
router.get('/signin', function(req, res, next){
    var messages = req.flash('error')
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0})
});
  
router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/admin',
    successRedirect: '/',
    failureRedirect: '/user/signin',
    failureFlash: true
}));




module.exports = router;

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

function notLoggedIn(req, res, next){
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};