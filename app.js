const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const configDB = require('./config/database.js');
mongoose.Promise = global.Promise;
//mongoose.connect(configDB.url, options); // connect to our database
// mongoose.connect(configDB.url,{ useMongoClient: true });
mongoose.connection.openUri(configDB.url,{ useMongoClient: true });

const index = require('./routes/index');
const admin = require('./routes/admin');
const passport = require('passport');  
const LocalStrategy = require('passport-local').Strategy;    
const flash = require('connect-flash');  
const session = require('express-session');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'shhsecret', resave: true, saveUninitialized: true }));  
app.use(passport.initialize());  
app.use(passport.session());  
app.use(flash());

require('./config/passport')(passport);

app.use('/', index);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
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

module.exports = app;
