define(["require", "exports", 'lodash'], function (require, exports, _) {
    "use strict";
    function makePrefixedLogger(prefix, logFnParam, optionsParam) {
        if (_.isObject(logFnParam))
            [logFnParam, optionsParam] = [undefined, logFnParam];
        const options = {
            logFn: logFnParam || console.log.bind(console),
            spacerAlt: optionsParam.spacerAlt || optionsParam.spacer || '',
            spacer: optionsParam.spacer || ' ',
            prefix: (_.isFunction(prefix) ? prefix : () => prefix),
            isEnabled: (_.isFunction(optionsParam.isEnabled) ? optionsParam.isEnabled : () => true)
        };
        const logger = function log(param1, ...rest) {
            if (!options.isEnabled())
                return;
            if (_.isString(param1))
                options.logFn(options.prefix() + options.spacer + param1, ...rest);
            else
                options.logFn(options.prefix() + options.spacerAlt, param1, ...rest);
        };
        logger.__src = '???'; // don't mind this
        return logger;
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = makePrefixedLogger;
});
//# sourceMappingURL=index.js.map