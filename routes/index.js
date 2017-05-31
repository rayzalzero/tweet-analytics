const express = require('express');
const router = express.Router();
const Twitter = require('twitter');
const Training = require('../models/training.js');
const Hasil = require('../models/hasil.js');

const client = new Twitter({
  consumer_key: 'uGGP2BkPdPbNILdQ7MzbScHxs',
  consumer_secret: '8XBdqgCsMwTUwHOBKROXPMDwWwG9yAYlwuL3w4p0PXKg4xiEYw',
  access_token_key: '559978133-St9zmnkO5oLJmswUWcih7ZCusS3vpQXfLNYlhaWH',
  access_token_secret: 'D7kiO2ijLqAsS5Z06e0lor3RtByY22a7Zjp7DYbUf5vuS'
});


const natural = require('natural')
const tokenizer = new natural.WordTokenizer();

let wordInDoc = {
                  positif: {},
                  negatif: {}
                };
let sumDocs = 0;
let sumAllDocs = {};
let docsByClass = {}
let wd = 'wd';
let word;
let vocab = {
              positif: {
                wd: ['baik', 'pintar', 'ramadhan', 'mubarak']
              },
              negatif: {
                wd: ['buruk', 'bodoh', 'bom', 'nakal', 'pantat', 'asu']
              }
            };
let cekwordInDoc = function (word, _class, delta) {
  if (arguments.length < 3) delta = 1
  if (!(word in wordInDoc[_class])) wordInDoc[_class][word] = 0
  wordInDoc[_class][word] += delta
  return this
}
let train = function (_class, docs) {
  docs = tokenizer.tokenize(docs)
    for (let i = 0; i < docs.length; i++) {
      word = docs[i];
        if (vocab[_class] && vocab[_class][wd].indexOf(word) !== -1) {
          cekwordInDoc(word, _class, 1);
        }
        if (!(_class in sumAllDocs)) sumAllDocs[_class] = 0
        sumAllDocs[_class]++
    }
  if (!(_class in docsByClass)) docsByClass[_class] = 0
  docsByClass[_class]++
  sumDocs++
};
let prior = function (_class) {
  let priori = (docsByClass[_class] / sumDocs)
  return priori
};
let countV = function () {
  let vc = vocab['positif'][wd].length + vocab['negatif'][wd].length
  return vc
};
let getword = function (_class, word) {
  let ww = (word in wordInDoc[_class] ? wordInDoc[_class][word] : 0)
  return ww
};
let likelihood = function (_class, docs) {
  let result = 1;
    for (let word of docs) {
      let probWord = (getword(_class, word) + 1) / (sumAllDocs[_class] + countV())
      result *= probWord
    }
  return result
};
let probabilities = function (docs) {
  docs = tokenizer.tokenize(docs)
    let result = {}
      for (let _class in wordInDoc) {
        result[_class] = prior(_class) * likelihood(_class, docs)
      }
  return result
};
let classify = function (docs) {
  docs = tokenizer.tokenize(docs)
  let highest = -Infinity, result = null
    for (let _class in wordInDoc) {
      let probability = prior(_class) * likelihood(_class, docs)
        if (probability === highest) {
          //highest = probability
          result = 'netral'
        }
        if (probability > highest) {
          highest = probability
          result = _class
        }
    }
  return result
}

//module.exports = train, classify, probabilities

/* GET home page. */
router.get('/', function (req, res, next) {
  Hasil.find({}, function (err, tra) {
    //let data = tra
    let data = []
    let Header = ['Keyword', 'Positif', 'Negatif', 'Netral'];
    data.push(Header);
    for (let i = 0; i < tra.length; i++) {
      let co = [
        tra[i].keyword + " " + tra[i].range, tra[i].klasifikasi.filter(function (item) { return item === "positif"; }).length,
        tra[i].klasifikasi.filter(function (item) { return item === "negatif"; }).length,
        tra[i].klasifikasi.filter(function (item) { return item === "netral"; }).length]
      data.push(co)
    }
    //console.log(data)
    res.render('index', { title: 'Twitter Analytics', 'data': JSON.stringify(data) });
  });

});

router.post('/tweet', function (req, res, next) {
  let tag = req.body.tag
  let startdate = req.body.start
  let enddate = req.body.end
  Training.find({}, function (err, tra) {
    for (let j = 0; j < tra.length; j++) {
      train(tra[j].label, tra[j].data)
      //console.log(wordInDoc)
      //console.log(docsByClass)
    }
  });

  client.get('search/tweets', { q: `${tag} since:${startdate} until:${enddate}`, count: 100 }, function (error, tweets, response) {
    let data = tweets.statuses
    let hasil = {}
    let tw = []
    let cl = []
    let hcl = []
      for (let i = 0; i < data.length; i++) {
        let hasilklasifikasi = classify(data[i].text)
        let bilhasilklasifikasi = probabilities(data[i].text)
        tw[i] = data[i].text
        cl[i] = hasilklasifikasi
        hcl[i] = bilhasilklasifikasi
        hasil.tweet = tw
        hasil.klasifikasi = cl
        hasil.bilanganklasifikasi = hcl
      }
      Hasil.create({
                      keyword: tag,
                      tweet: hasil.tweet,
                      klasifikasi: hasil.klasifikasi,
                      bilanganklasifikasi: hasil.bilanganklasifikasi,
                      range: startdate + " " + enddate
                    }, function (err, post) {
                      if (err) return next(err);
                      //res.redirect('/admin/maps')
                    });
    let numOfPositif = hasil.klasifikasi.filter(function (item) { return item === "positif"; }).length
    let numOfNegatif = hasil.klasifikasi.filter(function (item) { return item === "negatif"; }).length
    let numOfNetral = hasil.klasifikasi.filter(function (item) { return item === "netral"; }).length
    //console.log(hasil.bilanganklasifikasi)
    //res.json(tweets)
    wordInDoc = {
                  positif: {},
                  negatif: {}
                };
    sumDocs = 0;
    sumAllDocs = {};
    docsByClass = {}
    res.render('tweet', { 
                          data          : tag, 
                          tweet         : data, 
                          hasil         : hasil, 
                          numOfPositif  : numOfPositif, 
                          numOfNegatif  : numOfNegatif, 
                          numOfNetral   : numOfNetral 
                        })
  });
});

module.exports = router;
