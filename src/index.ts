import * as _ from 'lodash'

export type LogFn = typeof console.log

export interface PrefixedLoggerParams {
	logFn: LogFn
	spacerAlt: string
	spacer: string
	prefix: () => string
	isEnabled: () => boolean
}

export interface PrefixedLoggerOptions {
	spacerAlt?: string
	spacer?: string
	prefix?: () => string | string
	isEnabled?: () => boolean | boolean
}

// http://stackoverflow.com/questions/12766528/build-a-function-object-with-properties-in-typescript
export interface PrefixedLogger {
	(): void
	options: PrefixedLoggerParams
	__src: string // special string for module consumption experiments
}

export default function makePrefixedLogger(
	prefix: Function | string,
	logFnParam: LogFn | PrefixedLoggerOptions,
	optionsParam?: PrefixedLoggerOptions
): PrefixedLogger
{
	if (_.isObject(logFnParam))
		[logFnParam, optionsParam] = [undefined, logFnParam]

	const options: PrefixedLoggerParams = {
		logFn: logFnParam || console.log.bind(console),
		spacerAlt: optionsParam.spacerAlt || optionsParam.spacer || '',
		spacer: optionsParam.spacer || ' ',
		prefix: (_.isFunction(prefix) ? prefix : () => prefix) as () => string,
		isEnabled: (_.isFunction(optionsParam.isEnabled) ? optionsParam.isEnabled : () => true) as () => boolean
	}

	const logger: PrefixedLogger = <PrefixedLogger>function log(param1: any, ...rest: any[]) {
		if (!options.isEnabled()) return

		if (_.isString(param1))
			options.logFn(options.prefix() + options.spacer + param1, ...rest)
		else
			options.logFn(options.prefix() + options.spacerAlt, param1, ...rest)
	}

	logger.__src = '???' // don't mind this

	return logger
}
