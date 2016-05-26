'use strict';

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isstring');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.isobject');

var _lodash6 = _interopRequireDefault(_lodash5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makePrefixedLogger(prefix, logFn) {
	var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	if ((0, _lodash6.default)(logFn)) {
		;
		var _ref = [undefined, logFn];
		logFn = _ref[0];
		options = _ref[1];
	}logFn = logFn || console.log.bind(console);
	options.spacerAlt = options.spacerAlt || options.spacer || '';
	options.spacer = options.spacer || ' ';
	options.prefix = (0, _lodash2.default)(prefix) ? prefix : function () {
		return prefix;
	};
	options.isEnabled = (0, _lodash2.default)(options.isEnabled) ? options.isEnabled : function () {
		return true;
	};

	return function log(param1) {
		if (!options.isEnabled()) return;

		for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			rest[_key - 1] = arguments[_key];
		}

		if ((0, _lodash4.default)(param1)) logFn.apply(undefined, [options.prefix() + options.spacer + param1].concat(rest));else logFn.apply(undefined, [options.prefix() + options.spacerAlt, param1].concat(rest));
	};
}

module.exports = makePrefixedLogger;
//# sourceMappingURL=index.node-legacy.js.map