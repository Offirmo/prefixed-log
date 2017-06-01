#!/usr/bin/env node
'use strict';

var makePrefixedLogger = require('../dist/index.node-legacy').factory


var logger1 = makePrefixedLogger('* [foo]')
var logger2 = makePrefixedLogger(
	function() {return '[' + Date.now() + ']'},
	{
		spacer: ' > ',
		spacerAlt: ' >'
	}
)
var logger3 = makePrefixedLogger('!!!', console.error.bind(console), {
	isEnabled: false
})

logger1('Hello using version : "%s"', logger1.__src)
logger2('Hello again')
logger1({foo: 'bar'})
logger2([ 'foo', 'bar'])
logger3('should not appear')
