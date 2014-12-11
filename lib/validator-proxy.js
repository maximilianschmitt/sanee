'use strict';

var validator = require('validator');
var sanitizers = ['toString', 'toDate', 'toFloat', 'toInt', 'toBoolean', 'trim', 'ltrim', 'rtrim', 'escape', 'stripLow', 'whitelist', 'blacklist', 'normalizeEmail'];

var validatorProxy = function() {
	if (!(this instanceof validatorProxy)) {
		return new validatorProxy();
	}

	this.sanitizations = [];
};

validatorProxy.sanitizers = sanitizers;

validatorProxy.prototype.sanitize = function(value) {
	return this.sanitizations.reduce(function(previous, current) {
		return validator[current.sanitizerName].apply(validator, [previous].concat(current.arguments));
	}, value);
};

// map sanitizier to the prototype
sanitizers.forEach(function(sanitizerName) {
	validatorProxy.prototype[sanitizerName] = function() {
		this.sanitizations.push({ sanitizerName: sanitizerName, arguments: Array.prototype.slice.call(arguments, 0) });
		return this;
	};
});

// map sanitizier to the constructor
sanitizers.forEach(function(sanitizerName) {
	validatorProxy[sanitizerName] = function() {
		var vp = validatorProxy();
		return vp[sanitizerName].apply(vp, arguments);
	};
});

module.exports = validatorProxy;