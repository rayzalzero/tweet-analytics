var mongoose = require('mongoose');

var HasilSchema = new mongoose.Schema({  
    keyword: String,
    range : String,
    tweet: [],
    klasifikasi: [],
    bilanganklasifikasi: []
});

module.exports = mongoose.model('Hasil', HasilSchema); 