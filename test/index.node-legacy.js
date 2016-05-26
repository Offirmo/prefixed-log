#!/usr/bin/env node
'use strict';

var makePrefixedLogger = require('../dist/index.node-legacy')

var logger = makePrefixedLogger('* [foo]', console.log.bind(console))

logger('Hello', 42)
logger('Hello %d', 33)
logger({foo: 'bar'})

var logger1 = makePrefixedLogger('- [p1]')
var logger2 = makePrefixedLogger('* P2:', console.warn.bind(console))
var logger3 = makePrefixedLogger(function () { return Date.now() }, {
	separator: ' - ',
	separator_alt: ' -'
})

logger1('Hello', 42)
logger1({foo: 'bar'})
logger2('Hello', 42)
logger2({foo: 'bar'})
logger3('Hello', 42)
logger3({foo: 'bar'})
