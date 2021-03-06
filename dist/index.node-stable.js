'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _ = require('lodash');

function factory(prefix, logFnParam, optionsParam) {
    if (_.isObject(logFnParam) && !_.isFunction(logFnParam)) [logFnParam, optionsParam] = [undefined, logFnParam];
    optionsParam = optionsParam || {};
    const options = {
        logFn: logFnParam || optionsParam.logFn || console.log.bind(console),
        spacerAlt: optionsParam.spacerAlt || optionsParam.spacer || '',
        spacer: optionsParam.spacer || ' ',
        prefix: _.isFunction(prefix) ? prefix : () => prefix,
        isEnabled: _.isFunction(optionsParam.isEnabled) ? optionsParam.isEnabled : _.isBoolean(optionsParam.isEnabled) ? () => optionsParam.isEnabled : () => true
    };
    const logger = function log(param1, ...rest) {
        if (!options.isEnabled()) return;
        if (_.isString(param1)) options.logFn(options.prefix() + options.spacer + param1, ...rest);else options.logFn(options.prefix() + options.spacerAlt, param1, ...rest);
    };
    logger.options = options;
    logger.__src = '???'; // don't mind this
    return logger;
}

exports.factory = factory;
//# sourceMappingURL=index.node-stable.js.map
