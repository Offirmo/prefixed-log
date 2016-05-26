(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('lodash.isfunction'), require('lodash.isstring'), require('lodash.isobject')) :
	typeof define === 'function' && define.amd ? define(['lodash.isfunction', 'lodash.isstring', 'lodash.isobject'], factory) :
	(factory(global.isFunction,global.isString,global.isObject));
}(this, function (isFunction,isString,isObject) { 'use strict';

	isFunction = 'default' in isFunction ? isFunction['default'] : isFunction;
	isString = 'default' in isString ? isString['default'] : isString;
	isObject = 'default' in isObject ? isObject['default'] : isObject;

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

		return function log(param1) {
			if (!options.isEnabled()) return;

			for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				rest[_key - 1] = arguments[_key];
			}

			if (isString(param1)) logFn.apply(undefined, [options.prefix() + options.spacer + param1].concat(rest));else logFn.apply(undefined, [options.prefix() + options.spacerAlt, param1].concat(rest));
		};
	}

	module.exports = makePrefixedLogger;

}));
//# sourceMappingURL=prefixed-log.umd.js.map