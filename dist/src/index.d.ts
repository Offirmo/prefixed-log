export declare type LogFn = typeof console.log;
export interface PrefixedLoggerOptions {
    logFn: LogFn;
    spacerAlt: string;
    spacer: string;
    prefix: () => string;
    isEnabled: () => boolean;
}
export interface PrefixedLoggerOptionsParam {
    spacerAlt?: string;
    spacer?: string;
    prefix?: () => string | string;
    isEnabled?: () => boolean | boolean;
}
export interface PrefixedLogger {
    (): void;
    options: PrefixedLoggerOptions;
    __src: string;
}
export default function makePrefixedLogger(prefix: Function | string, logFnParam: LogFn | PrefixedLoggerOptionsParam, optionsParam?: PrefixedLoggerOptionsParam): PrefixedLogger;
