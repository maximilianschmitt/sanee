/* global describe, it */
'use strict';

var expect = require('chai').expect;
var sanee = require('../lib/sanee');

describe('sanee', function() {
	it('returns sanitized object', function() {
		var sanitize = sanee({
			email: sanee.normalizeEmail({ lowercase: true }),
			name: sanee.trim()
		});

		var sanitized = sanitize({ email: 'Maximilian.schmitt@googleMail.com', name: '  Max   ' });
		expect(sanitized).to.deep.equal({ email: 'maximilianschmitt@gmail.com', name: 'Max' });
	});

	it('allows chaining', function() {
		var sanitize = sanee({
			name: sanee.ltrim('.').rtrim('#')
		});

		var sanitized = sanitize({ name: '..max###' });
		expect(sanitized).to.deep.equal({ name: 'max' });
	});

	it('sanitizes nested objects', function() {
		var sanitize = sanee({
			user: {
				email: sanee.normalizeEmail({ lowercase: true }),
				name: sanee.trim()
			}
		});

		var sanitized = sanitize({ user: { email: 'Maximilian.schmitt@googleMail.com', name: '  Max   ' } });
		expect(sanitized).to.deep.equal({ user: { email: 'maximilianschmitt@gmail.com', name: 'Max' } });
	});
});