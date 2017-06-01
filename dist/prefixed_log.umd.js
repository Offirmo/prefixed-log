(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash')) :
	typeof define === 'function' && define.amd ? define(['exports', 'lodash'], factory) :
	(factory((global.prefixed_log = global.prefixed_log || {}),global._));
}(this, (function (exports,_) { 'use strict';

function factory(prefix, logFnParam, optionsParam) {
    if (_.isObject(logFnParam) && !_.isFunction(logFnParam)) {
        
        var _ref = [undefined, logFnParam];
        logFnParam = _ref[0];
        optionsParam = _ref[1];
    }optionsParam = optionsParam || {};
    var options = {
        logFn: logFnParam || optionsParam.logFn || console.log.bind(console),
        spacerAlt: optionsParam.spacerAlt || optionsParam.spacer || '',
        spacer: optionsParam.spacer || ' ',
        prefix: _.isFunction(prefix) ? prefix : function () {
            return prefix;
        },
        isEnabled: _.isFunction(optionsParam.isEnabled) ? optionsParam.isEnabled : _.isBoolean(optionsParam.isEnabled) ? function () {
            return optionsParam.isEnabled;
        } : function () {
            return true;
        }
    };
    var logger = function log(param1) {
        if (!options.isEnabled()) return;

        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            rest[_key - 1] = arguments[_key];
        }

        if (_.isString(param1)) options.logFn.apply(options, [options.prefix() + options.spacer + param1].concat(rest));else options.logFn.apply(options, [options.prefix() + options.spacerAlt, param1].concat(rest));
    };
    logger.options = options;
    logger.__src = '???'; // don't mind this
    return logger;
}

exports.factory = factory;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=prefixed_log.umd.js.map
