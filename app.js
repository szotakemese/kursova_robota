var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);


const api = require("./admin");


var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');

var app = express();

mongoose.connect('mongodb://localhost:27017/shopping', { useNewUrlParser: true, useUnifiedTopology: true})
require('./config/passport');
/*
const url = "mongodb://127.0.0.1:27017";
const dbName = 'shopping';

mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true});
*/


// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}))
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'mysecret', 
  resave: false, 
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session; 
  next();
});

app.use('/user', userRouter);
app.use('/', indexRouter);
app.use('/admin', adminRouter);


app.use("/product", api.router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);

module.exports = app;

