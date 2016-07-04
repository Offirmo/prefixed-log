'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isFunction = _interopDefault(require('lodash.isfunction'));
var isString = _interopDefault(require('lodash.isstring'));
var isObject = _interopDefault(require('lodash.isobject'));

console.log('PREFIXED-LOG hello from dist/browser');

function makePrefixedLogger(prefix, logFn) {
	var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	if (isObject(logFn)) {
		;
		var _ref = [undefined, logFn];
		logFn = _ref[0];
		options = _ref[1];
	}logFn = logFn || console.log.bind(console);
	options.spacerAlt = options.spacerAlt || options.spacer || '';
	options.spacer = options.spacer || ' ';
	options.prefix = isFunction(prefix) ? prefix : function () {
		return prefix;
	};
	options.isEnabled = isFunction(options.isEnabled) ? options.isEnabled : function () {
		return true;
	};

	var logger = function log(param1) {
		if (!options.isEnabled()) return;

		for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			rest[_key - 1] = arguments[_key];
		}

		if (isString(param1)) logFn.apply(undefined, [options.prefix() + options.spacer + param1].concat(rest));else logFn.apply(undefined, [options.prefix() + options.spacerAlt, param1].concat(rest));
	};

	logger.__src = 'dist/browser'; // WIP to debug module resolution

	return logger;
}

module.exports = makePrefixedLogger;
//# sourceMappingURL=index.browser.js.map
