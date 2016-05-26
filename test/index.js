#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node --harmony_modules --harmony_regexp_property "$0" "$@"
'use strict';

// https://nodejs.org/en/docs/es6/
// node --v8-options | grep "in progress"

console.log('Hello world !')

const makePrefixedLogger = require('../src')


const logger = makePrefixedLogger('* [foo]', console.log.bind(console))

logger('Hello', 42)
logger('Hello %d', 33)
logger({foo: 'bar'})

const logger1 = makePrefixedLogger('- [p1]')
const logger2 = makePrefixedLogger('* P2:', console.warn.bind(console))
const logger3 = makePrefixedLogger(() => Date.now(), {
    separator: ' - ',
    separator_alt: ' -'
})

logger1('Hello', 42)
logger1({foo: 'bar'})
logger2('Hello', 42)
logger2({foo: 'bar'})
logger3('Hello', 42)
logger3({foo: 'bar'})
