export declare type LogFn = typeof console.log;
export interface PrefixedLoggerOptions {
    logFn?: LogFn;
    spacerAlt?: string;
    spacer?: string;
    isEnabled?: (() => boolean) | boolean;
}
export interface PrefixedLoggerParams {
    logFn: LogFn;
    spacerAlt: string;
    spacer: string;
    prefix: () => string;
    isEnabled: () => boolean;
}
export interface PrefixedLogger {
    (...rest: any[]): void;
    options: PrefixedLoggerParams;
    __src: string;
}
export default function makePrefixedLogger(prefix: Function | string, logFnParam?: LogFn | PrefixedLoggerOptions, optionsParam?: PrefixedLoggerOptions): PrefixedLogger;
