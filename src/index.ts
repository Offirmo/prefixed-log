import isFunction from 'lodash.isfunction'
import isString from 'lodash.isstring'
import isObject from 'lodash.isobject'

// http://stackoverflow.com/questions/12766528/build-a-function-object-with-properties-in-typescript

//console.log('PREFIXED-LOG hello from ???')

export interface PrefixedLogger {
	(): void
	__src: string
}

export default function makePrefixedLogger(
	prefix: Function | string,
	logFn,
	options = {}
): PrefixedLogger
{
	if (isObject(logFn))
		[logFn, options] = [undefined, logFn]
	logFn = logFn || console.log.bind(console)

	options.spacerAlt = options.spacerAlt || options.spacer || ''
	options.spacer = options.spacer || ' '
	options.prefix = isFunction(prefix) ? prefix : () => prefix
	options.isEnabled = isFunction(options.isEnabled) ? options.isEnabled : () => true

	const logger = <PrefixedLogger>function log(param1, ...rest) {
		if (!options.isEnabled()) return

		if (isString(param1))
			logFn(options.prefix() + options.spacer + param1, ...rest)
		else
			logFn(options.prefix() + options.spacerAlt, param1, ...rest)
	}

	logger.__src = '???' // WIP to debug module resolution

	return logger
}
