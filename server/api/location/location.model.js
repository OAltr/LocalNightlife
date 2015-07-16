'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var LocationSchema = new Schema({
	user: {type: Schema.ObjectId, ref: 'User'},
	location: String,  // yelpID
	date: String // date format d/m/y
});

module.exports = mongoose.model('Location', LocationSchema);
