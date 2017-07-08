const express = require('express');
const router = express.Router();
const Twitter = require('twitter');
const Training = require('../models/training.js');
const Hasil = require('../models/hasil.js');
//const nbayes = require('io-naivebayes');
const nbayes = require('../config/naivebayes/nb');

const client = new Twitter({
	consumer_key: 'uGGP2BkPdPbNILdQ7MzbScHxs',
	consumer_secret: '8XBdqgCsMwTUwHOBKROXPMDwWwG9yAYlwuL3w4p0PXKg4xiEYw',
	access_token_key: '559978133-St9zmnkO5oLJmswUWcih7ZCusS3vpQXfLNYlhaWH',
	access_token_secret: 'D7kiO2ijLqAsS5Z06e0lor3RtByY22a7Zjp7DYbUf5vuS'
});

/* GET home page. */
router.get('/', function (req, res, next) {
	let query = Hasil.find({}).limit(5).sort( { $natural: -1 } );
	query.exec(function (err, tra) {
		let data = [];
		let Header = ['Keyword', 'Positif', 'Negatif', 'Netral'];
		data.push(Header);
		for (let i = 0; i < tra.length; i++) {
			let co = [
				tra[i].keyword, tra[i].klasifikasi.filter(function (item) { return item === 'positif'; }).length,
				tra[i].klasifikasi.filter(function (item) { return item === 'negatif'; }).length,
				tra[i].klasifikasi.filter(function (item) { return item === 'netral'; }).length];
			data.push(co);
		}
		res.render('index', { title: 'Twitter Analytics', 'data': JSON.stringify(data) });
	});
});

router.post('/tweet', function (req, res, next) {
	let tag = req.body.tag;
	let startdate = req.body.start;
	let enddate = req.body.end;
	let tingkatakurasi;
	let lajuerror;
	function hitungakurasi(a, b, c) {
		tingkatakurasi = (Math.floor((a / c) * 100));
		lajuerror = (Math.floor((b / c) * 100));
		return this;
	}
	Training.find({}, function (err, tra) {
		for (let j = 0; j < tra.length; j++) {
			nbayes.train(tra[j].label, tra[j].data);
		}
	});
	//var query = Training.find({}).limit(10).sort( { $natural: -1 } );
	//query.exec(function (err, tra) {
	Training.find({}, function (err, tra) {
		let databenar = 0;
		let datasalah = 0;
		let alldatatrain = tra.length;
		for (let j = 0; j < tra.length; j++) {
			
			if (nbayes.classify(tra[j].data) == tra[j].label) {
				databenar++;
			}else{
				datasalah++;
				//console.log(tra[j].data + 'salah');
				//console.log(tra[j].data, nbayes.probabilities(tra[j].data));
			}
		}
		hitungakurasi(databenar, datasalah, alldatatrain);
	});
	client.get('search/tweets', { q: `${tag} -filter:retweets since:${startdate} until:${enddate}`, count: 100 }, function (error, tweets, response) {
		let data = tweets.statuses;
		if (data.length === 0) {
			console.log('data kosong');
			res.render('empty');
		}else{
			let hasil = {};
			let tw = [];
			let cl = [];
			let hcl = [];
			for (let i = 0; i < data.length; i++) {
				let hasilklasifikasi = nbayes.classify(data[i].text);
				let bilhasilklasifikasi = nbayes.classifyplus(data[i].text);
				tw[i] = data[i].text;
				cl[i] = hasilklasifikasi;
				hcl[i] = bilhasilklasifikasi;
				hasil.tweet = tw;
				hasil.klasifikasi = cl;
				hasil.bilanganklasifikasi = hcl;
			}
			Hasil.create({
				keyword: tag,
				tweet: hasil.tweet,
				klasifikasi: hasil.klasifikasi,
				bilanganklasifikasi: hasil.bilanganklasifikasi,
				range: startdate + ' ' + enddate
			}, function (err, post) {
				if (err) return next(err);
			//res.redirect('/');
			});
			let numOfPositif = hasil.klasifikasi.filter(function (item) { return item === 'positif'; }).length;
			let numOfNegatif = hasil.klasifikasi.filter(function (item) { return item === 'negatif'; }).length;
			let numOfNetral = hasil.klasifikasi.filter(function (item) { return item === 'netral'; }).length;
    //console.log(hasil.bilanganklasifikasi)
    //res.json(tweets)
			nbayes.retraining();
			res.render('tweet', { 
				akurasi       : tingkatakurasi,
				lajuerror     : lajuerror,
				data          : tag, 
				tweet         : data, 
				hasil         : hasil, 
				numOfPositif  : numOfPositif, 
				numOfNegatif  : numOfNegatif, 
				numOfNetral   : numOfNetral 
			});
		}
		
	});
});

module.exports = router;
