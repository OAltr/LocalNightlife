'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
	if(!process.env[name]) {
		throw new Error('You must set the ' + name + ' environment variable');
	}
	return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
	env: process.env.NODE_ENV,

	// Root path of server
	root: path.normalize(__dirname + '/../../..'),

	// Server port
	port: process.env.PORT || 9000,

	// Should we populate the DB with sample data?
	seedDB: false,

	// Secret for session, you will want to change this and make it an environment variable
	secrets: {
		session: 'local-nightlife-secret'
	},

	// List of user roles
	userRoles: ['guest', 'user', 'admin'],

	// MongoDB connection options
	mongo: {
		options: {
			db: {
				safe: true
			}
		}
	},

	twitter: {
		clientID:     process.env.TWITTER_ID || 'id',
		clientSecret: process.env.TWITTER_SECRET || 'secret',
		callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
	},

	yelp: {
		consumer_key: process.env.YELP_KEY || 'key',
		consumer_secret: process.env.YELP_SECRET || 'secret',
		token: process.env.YELP_TOKEN || 'token',
		token_secret: process.env.YELP_TOKEN_SECRET || 'token_secret'
	}
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
	all,
	require('./' + process.env.NODE_ENV + '.js') || {});
