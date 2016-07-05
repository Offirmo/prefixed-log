import isFunction from 'lodash.isfunction';
import isString from 'lodash.isstring';
import isObject from 'lodash.isobject';
export default function makePrefixedLogger(prefix, logFn, options = {}) {
    if (isObject(logFn))
        [logFn, options] = [undefined, logFn];
    logFn = logFn || console.log.bind(console);
    options.spacerAlt = options.spacerAlt || options.spacer || '';
    options.spacer = options.spacer || ' ';
    options.prefix = isFunction(prefix) ? prefix : () => prefix;
    options.isEnabled = isFunction(options.isEnabled) ? options.isEnabled : () => true;
    const logger = function log(param1, ...rest) {
        if (!options.isEnabled())
            return;
        if (isString(param1))
            logFn(options.prefix() + options.spacer + param1, ...rest);
        else
            logFn(options.prefix() + options.spacerAlt, param1, ...rest);
    };
    logger.__src = '???'; // WIP to debug module resolution
    return logger;
}
//# sourceMappingURL=index.js.map