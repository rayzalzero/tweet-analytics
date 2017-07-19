const mongoose = require('mongoose');

let HasilSchema = new mongoose.Schema({  
	keyword: String,
	range : String,
	tweet: [],
	klasifikasi: [],
	bilanganklasifikasi: []
});

module.exports = mongoose.model('Hasil', HasilSchema); 