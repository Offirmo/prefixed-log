import * as _ from 'lodash'

type LogFn = typeof console.log

// options when creating the logger
interface PrefixedLoggerOptions {
	logFn?: LogFn
	spacerAlt?: string
	spacer?: string
	isEnabled?: (() => boolean) | boolean
}

// internal logger options
interface PrefixedLoggerParams {
	logFn: LogFn
	spacerAlt: string
	spacer: string
	prefix: () => string
	isEnabled: () => boolean
}

// http://stackoverflow.com/questions/12766528/build-a-function-object-with-properties-in-typescript
interface PrefixedLogger {
	(...rest: any[]): void
	options: PrefixedLoggerParams
	__src: string // special string for module consumption experiments
}

function factory(
	prefix: Function | string,
	logFnParam?: LogFn | PrefixedLoggerOptions,
	optionsParam?: PrefixedLoggerOptions
): PrefixedLogger
{
	if (_.isObject(logFnParam) && !_.isFunction(logFnParam))
		[logFnParam, optionsParam] = [undefined, logFnParam]
	optionsParam = optionsParam || {}

	const options: PrefixedLoggerParams = {
		logFn: logFnParam || optionsParam.logFn || console.log.bind(console),
		spacerAlt: optionsParam.spacerAlt || optionsParam.spacer || '',
		spacer: optionsParam.spacer || ' ',
		prefix: (_.isFunction(prefix) ? prefix : () => prefix) as () => string,
		isEnabled: (
			_.isFunction(optionsParam.isEnabled) ?
			optionsParam.isEnabled :
			(_.isBoolean(optionsParam.isEnabled) ? (() => optionsParam.isEnabled) : (() => true))
		) as () => boolean
	}

	const logger: PrefixedLogger = <PrefixedLogger>function log(param1: any, ...rest: any[]) {
		if (!options.isEnabled()) return

		if (_.isString(param1))
			options.logFn(options.prefix() + options.spacer + param1, ...rest)
		else
			options.logFn(options.prefix() + options.spacerAlt, param1, ...rest)
	}
	logger.options = options
	logger.__src = '???' // don't mind this

	return logger
}


export {
	LogFn,
	PrefixedLoggerOptions,
	PrefixedLoggerParams,
	PrefixedLogger,
	factory,
}
