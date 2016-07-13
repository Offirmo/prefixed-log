(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('lodash')) :
    typeof define === 'function' && define.amd ? define(['lodash'], factory) :
    (global.prefixed_log = factory(global._));
}(this, function (_) { 'use strict';

    console.log('Hello from', __filename, __dirname);
    function makePrefixedLogger(prefix, logFnParam, optionsParam) {
        if (_.isObject(logFnParam) && !_.isFunction(logFnParam)) {
            ;
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

    return makePrefixedLogger;

}));
//# sourceMappingURL=prefixed_log.umd.js.map