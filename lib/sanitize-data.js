'use strict';

var validatorProxy = require('./validator-proxy');

var sanitizeData = function(schema, data) {
	var sanitized = {};

	Object.keys(schema).forEach(function(attribute) {
		var child = schema[attribute];

		if (child instanceof validatorProxy) {
			var proxy = child;
			sanitized[attribute] = proxy.sanitize(data[attribute]);
			return;
		}

		if (typeof child === 'object') {
			var subSchema = child;
			sanitized[attribute] = sanitizeData(subSchema, data[attribute]);
		}
	});

	return sanitized;
};

module.exports = sanitizeData;