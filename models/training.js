const mongoose = require('mongoose');

let TrainingSchema = new mongoose.Schema({  
	data: String,
	label: String
});

module.exports = mongoose.model('Training', TrainingSchema); 