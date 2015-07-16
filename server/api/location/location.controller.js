'use strict';

var _ = require('lodash');
var Location = require('./location.model');
var config = require('../../config/environment');
var yelp = require('yelp').createClient({
	consumer_key: config.yelp.consumer_key,
	consumer_secret: config.yelp.consumer_secret,
	token: config.yelp.token,
	token_secret: config.yelp.token_secret
});

var today = function() {
	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();

	return day + "/" + month + "/" + year;
}

// Get near locations
exports.show = function(req, res) {
	var city = req.params.city || '';
	var user = req.params.userID || '';

	yelp.search({term: "bar", location: city}, function(error, data) {
		var locationIDs = data.businesses.map(function(business) {
			return business.id;
		});

		Location.find({location: {$in: locationIDs}, date: today()}, function (err, allLocations) {
			if(err) { return handleError(res, err); }
			if(!allLocations) { return res.send(404); }

			var locations = data.businesses.map(function(business) {
				return {
					id: business.id,
					name: business.name,
					url: business.url,
					going: allLocations.filter(function(location) {
						return location.location === business.id;
					}).length,
					userGoing: (allLocations.filter(function(location) {
						return location.location === business.id && location.user === user;
					}).length > 0)
				};
			});

			return res.json(locations);
		})
	});
};

// Creates a new location in the DB.
exports.create = function(req, res) {
	var location = req.params.locationID;
	var user = req.params.userID;

	var newLocation = new Location();
	newLocation.user = user;
	newLocation.location = location;
	newLocation.date = today();

	newLocation.save(function(err, location) {
		if(err) { return handleError(res, err); }
		return res.json(201, location);
	});
};

// Deletes a location from the DB.
exports.destroy = function(req, res) {
	var location = req.params.locationID;
	var user = req.params.userID;
	Location.find({location: location, user: user, date: today()}, function (err, location) {
		if(err) { return handleError(res, err); }
		if(!location) { return res.send(404); }
		location.remove(function(err) {
			if(err) { return handleError(res, err); }
			return res.send(204);
		});
	});
};

function handleError(res, err) {
	return res.send(500, err);
}
