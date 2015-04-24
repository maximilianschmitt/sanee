# sanee

[![Travis Build](http://img.shields.io/travis/maximilianschmitt/sanee.svg?style=flat)](https://travis-ci.org/maximilianschmitt/sanee) [![Coverage Status](https://coveralls.io/repos/maximilianschmitt/sanee/badge.svg)](https://coveralls.io/r/maximilianschmitt/sanee)

> A sanitizer for (nested) objects with a simple API. For validating objects, check out [valee](https://github.com/maximilianschmitt/valee).

## Usage

### Installation

```
$ npm install sanee
```

### Example

``` js
var sanee = require('sanee');

// create sanitize-function
var sanitize = sanee({
	user: {
		email: sanee.normalizeEmail({ lowercase: true }),
		name: sanee.trim()
	}
});

// sanitize input
var sanitizedInput = sanitize({
	user: {
		email: 'Maximilian.schmitt@googleMail.com',
		name: '  Max   '
	}
});

// print sanitized input
console.log(sanitizedInput);
```

Output:

```js
{
	user: {
		email: 'maximilianschmitt@gmail.com',
		name: 'Max'
	}
}
```

## Sanitizers

All sanitizers of sanee currently map to the [sanitizers of validator.js](https://github.com/chriso/validator.js#sanitizers).