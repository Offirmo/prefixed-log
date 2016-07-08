import * as _ from 'lodash'

//console.log('PREFIXED-LOG hello from ???')

export type LogFn = typeof console.log

export interface PrefixedLoggerOptions {
	logFn: LogFn
	spacerAlt: string
	spacer: string
	prefix: () => string
	isEnabled: () => boolean
}

export interface PrefixedLoggerOptionsParam {
	spacerAlt?: string
	spacer?: string
	prefix?: () => string | string
	isEnabled?: () => boolean | boolean
}

// http://stackoverflow.com/questions/12766528/build-a-function-object-with-properties-in-typescript
export interface PrefixedLogger {
	(): void
	options: PrefixedLoggerOptions
	__src: string // special string for module consumption experiments
}

export default function makePrefixedLogger(
	prefix: Function | string,
	logFnParam: LogFn | PrefixedLoggerOptionsParam,
	optionsParam?: PrefixedLoggerOptionsParam
): PrefixedLogger
{
	if (_.isObject(logFnParam))
		[logFnParam, optionsParam] = [undefined, logFnParam]

	const options: PrefixedLoggerOptions = {
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
