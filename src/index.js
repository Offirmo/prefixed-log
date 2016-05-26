const isFunction = require('lodash.isfunction')
const isString = require('lodash.isstring')

function makePrefixedLogger(prefix, log_fn, options = {}) {
    options.spacerAlt = options.spacerAlt || options.spacer || ''
    options.spacer = options.spacer || ' '
    options.prefix = isFunction(prefix) ? prefix : () => prefix
    options.isEnabled = isFunction(options.isEnabled) ? options.isEnabled : () => true

    return function log(param1, ...rest) {
        if (! options.isEnabled()) return

        if (isString(param1))
            console.log(options.prefix() + options.spacer + param1, ...rest)
        else
            console.log(options.prefix() + options.spacerAlt, param1, ...rest)
    }
}

module.exports = makePrefixedLogger
