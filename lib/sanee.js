'use strict';

var validatorProxy = require('./validator-proxy');
var sanitizeData = require('./sanitize-data');

// this is basically only the api
var sanee = function(arg) {
	if (typeof arg === 'string') {
		return validatorProxy.apply(null, arguments);
	}

	if (typeof arg === 'object') {
		var schema = arg;
		return sanitizeData.bind(null, schema);
	}

	throw new TypeError('Invalid Argument');
};

validatorProxy.sanitizers.forEach(function(method) {
	sanee[method] = validatorProxy[method].bind(validatorProxy);
});

module.exports = sanee;