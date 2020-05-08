var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Product = require('../models/product');

var csrfProtection = csrf();
router.use(csrfProtection);
  

//GET Admin page
router.get('/', isLoggedIn, function(req, res, next) {
    Product.find(function(err, docs){
      var productlist = [];
      productlist.push(docs)
      res.render('user/admin', { title: 'Admin Page', products: productlist });
    });
  });


//Logging out and get Home page
router.get('/logout', isLoggedIn, function(req, res, next){
    req.logOut();
    res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next){
    next()
});

//Singning in
router.get('/signin', function(req, res, next){
    var messages = req.flash('error')
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0})
});
  
router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/admin',
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));

router.delete("/delete/: id" , function (req, res) {
    var Id = req.params.id.toString();

    Product.findByIdAndDelete( Id, function(err, result) {
        result.remove(function (err, res) {
            res.redirect('/');
        });
    });
});


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