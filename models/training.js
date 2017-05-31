var mongoose = require('mongoose');

var TrainingSchema = new mongoose.Schema({  
    data: String,
    label: String
});

module.exports = mongoose.model('Training', TrainingSchema); 