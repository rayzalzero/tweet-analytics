var express = require('express');
var router = express.Router();
var passport = require('passport');
var Training = require('../models/training.js');

router.get('/home', isLoggedIn, function (req, res, next) {
  Training.find({}, function (err, data) {
    res.render('admin/home', { data: data, user: req.user })
  });
});

router.get('/training', isLoggedIn, function (req, res, next) {
  //Training.find({}, function (err, data) {
    res.render('admin/training', { data: 1, user: req.user })
  //});
});

router.get('/', function (req, res, next) {
  res.render('admin/index', { message: req.flash('loginMessage') });
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/delete/:id', function (req, res, next) {
  Training.remove({ _id: req.params.id }, function (err, post) {
    if (err) return next(err);
    res.redirect('/admin')
  });
});

router.post('/', function (req, res, next) {
  Training.create(req.body, function (err, post) {
    if (err) return next(err);
    res.redirect('/admin')
  });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/admin/home',
  failureRedirect: '/admin/login',
  failureFlash: true,
}));

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/admin');
}

module.exports = router;
