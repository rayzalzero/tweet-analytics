
const natural = require('natural')
const tokenizer = new natural.WordTokenizer();

var wordInDoc = {
    positif : {},
    negatif : {}
};
var sumDocs = 0;
var sumAllDocs = {};
var docsByClass = {}
var wd = 'wd';
var word;
var vocab = {
    positif: {
      wd: ['baik', 'pintar']
    },
    negatif: {
      wd: ['buruk', 'bodoh']
    }
  };
var cekwordInDoc = function(word, _class, delta){
  if (arguments.length < 3) delta = 1
  if (!(word in wordInDoc[_class])) wordInDoc[_class][word] = 0
  wordInDoc[_class][word] += delta
	return this
}
var train = function(_class, docs) {
  docs = tokenizer.tokenize(docs)
  for (var i = 0;i < docs.length; i++) {
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
var prior = function(_class){
    var priori = (docsByClass[_class] / sumDocs)
    return priori
};
var countV = function(){
  var vc = vocab['positif'][wd].length + vocab['negatif'][wd].length
  return vc
};
var getword = function(_class, word){
  var ww = (word in wordInDoc[_class] ? wordInDoc[_class][word] : 0)
  return ww 
};
var likelihood = function(_class, docs) {
var result = 1;
  for (var word of docs){
      var probWord = (getword(_class, word) + 1) / (sumAllDocs[_class] + countV())
      result *= probWord
    }
    return result
};
var probabilities = function (docs) {
    docs = tokenizer.tokenize(docs)
    let result = {}
	  for (let _class in wordInDoc) {
        result[_class] = prior(_class) * likelihood(_class, docs)
    }
	  return result
};
var classify = function (docs){
      docs = tokenizer.tokenize(docs)
  		let highest = -Infinity, result = null
			for (let _class in wordInDoc) {
				let probability = prior(_class) * likelihood(_class, docs)
				if (probability > highest) {
					highest = probability
					result = _class
				}
			}
			return result
}

module.exports = train, classify, probabilities