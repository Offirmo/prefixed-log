declare type LogFn = typeof console.log;
interface PrefixedLoggerOptions {
    logFn?: LogFn;
    spacerAlt?: string;
    spacer?: string;
    isEnabled?: (() => boolean) | boolean;
}
interface PrefixedLoggerParams {
    logFn: LogFn;
    spacerAlt: string;
    spacer: string;
    prefix: () => string;
    isEnabled: () => boolean;
}
interface PrefixedLogger {
    (...rest: any[]): void;
    options: PrefixedLoggerParams;
    __src: string;
}
declare function factory(prefix: Function | string, logFnParam?: LogFn | PrefixedLoggerOptions, optionsParam?: PrefixedLoggerOptions): PrefixedLogger;
export { LogFn, PrefixedLoggerOptions, PrefixedLoggerParams, PrefixedLogger, factory };
