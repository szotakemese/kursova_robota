var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

//Validation for SignUp
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    if(password.length < 4){
        return done(null, false, {message: 'Invalid Password'})
    };
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) == false) {
        return done(null, false, {message: 'Invalid Email'})
    };
    User.findOne({'email': email}, function(err, user){
        if (err){
            return done(err);
        }
        if (user){
            return done(null, false, {message: 'Email is already in use'})
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, result){
            if (err){
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));

//Validation for SignIn
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    if(password.length < 4){
        return done(null, false, {message: 'Invalid Password'})
    };
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) == false) {
        return done(null, false, {message: 'Invalid Email'})
    };User.findOne({'email': email}, function(err, user){
        if (err){
            return done(err);
        }
        if (!user){
            return done(null, false, {message: 'No user found'})
        }
        if (!user.validPassword(password)){
            return done(null, false, {message: 'Wrong pasword'})
        }
        return done(null, user);
    });
}));