'use strict';

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isstring');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.isobject');

var _lodash6 = _interopRequireDefault(_lodash5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('PREFIXED-LOG hello from dist/node6');

function makePrefixedLogger(prefix, logFn, options = {}) {
	if ((0, _lodash6.default)(logFn)) [logFn, options] = [undefined, logFn];
	logFn = logFn || console.log.bind(console);
	options.spacerAlt = options.spacerAlt || options.spacer || '';
	options.spacer = options.spacer || ' ';
	options.prefix = (0, _lodash2.default)(prefix) ? prefix : () => prefix;
	options.isEnabled = (0, _lodash2.default)(options.isEnabled) ? options.isEnabled : () => true;

	const logger = function log(param1, ...rest) {
		if (!options.isEnabled()) return;

		if ((0, _lodash4.default)(param1)) logFn(options.prefix() + options.spacer + param1, ...rest);else logFn(options.prefix() + options.spacerAlt, param1, ...rest);
	};

	logger.__src = 'dist/node6'; // WIP to debug module resolution

	return logger;
}

module.exports = makePrefixedLogger;
//# sourceMappingURL=index.node6.js.map
