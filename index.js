'use strict';
console.log('Hello from prefixed-log root index.js');

var NODE_MAJOR = process.version.slice(0, process.version.indexOf('.'));
console.log('NODE_MAJOR = ' + NODE_MAJOR);

switch(NODE_MAJOR) {
	case 'v4':
	case 'v5':
		module.exports = require('./dist/index.node4');
		return;
	case 'v6':
		module.exports = require('./dist/index.node6');
		return;
	default:
		module.exports = require('./dist/index.node-legacy');
}
