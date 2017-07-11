var express = require('express');
var router = express.Router();
var passport = require('passport');
var Training = require('../models/training.js');
const cleaner = require('../config/ckwd');
const Twitter = require('twitter');

const client = new Twitter({
	consumer_key: 'uGGP2BkPdPbNILdQ7MzbScHxs',
	consumer_secret: '8XBdqgCsMwTUwHOBKROXPMDwWwG9yAYlwuL3w4p0PXKg4xiEYw',
	access_token_key: '559978133-St9zmnkO5oLJmswUWcih7ZCusS3vpQXfLNYlhaWH',
	access_token_secret: 'D7kiO2ijLqAsS5Z06e0lor3RtByY22a7Zjp7DYbUf5vuS'
});

router.get('/home', isLoggedIn, function (req, res, next) {
	var query = Training.find({}).sort( { $natural: -1 } );
	query.exec(function (err, data) {
		res.render('admin/home', { data: data, user: req.user });
	});
});

router.get('/training', isLoggedIn, function (req, res, next) {
	res.render('admin/training', {user: req.user });
});

router.post('/training', isLoggedIn, function (req, res, next) {
	let tag = req.body.tag;
	client.get('search/tweets', { q: `${tag} -filter:retweets`, count: 25 }, function (error, tweets, response) {
		let data = tweets.statuses;
		let kirimdata = [];
		for (var i = 0; i < data.length; i++) {
			var element = data[i].text;
			if (cleaner.cari(element).ckdw=='') {
				
			} else {
				kirimdata.push({data:cleaner.cari(element).docs, ket:cleaner.cari(element).ckdw});
			}	
		}
		res.render('admin/training', {data:kirimdata, user:req.user });
	});
});

router.post('/settraining', isLoggedIn, function (req, res, next) {
	let labels = req.body.label;
	let datas = req.body.data;
	for (var i = 0; i < datas.length; i++) {
		if(datas[i] != ''){
			Training.create({
				data: datas[i],
				label: labels[i]
			}, function (err, post) {
				if (err) return next(err);
			});
		}else{

		}
	}
	res.redirect('/admin/home');
});

router.get('/', function (req, res, next) {
	res.render('admin/index', { message: req.flash('loginMessage') });
});

router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/admin/home');
});

router.get('/delete/:id', function (req, res, next) {
	Training.remove({ _id: req.params.id }, function (err, post) {
		if (err) return next(err);
		res.redirect('/admin/home');
	});
});

router.post('/', function (req, res, next) {
	Training.create(req.body, function (err, post) {
		if (err) return next(err);
		res.redirect('/admin');
	});
});

router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/admin/home',
	failureRedirect: '/admin',
	failureFlash: true,
}));

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/admin');
}

module.exports = router;
