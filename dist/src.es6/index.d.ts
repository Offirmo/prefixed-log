export declare type LogFn = typeof console.log;
export interface PrefixedLoggerParams {
    logFn: LogFn;
    spacerAlt: string;
    spacer: string;
    prefix: () => string;
    isEnabled: () => boolean;
}
export interface PrefixedLoggerOptions {
    spacerAlt?: string;
    spacer?: string;
    prefix?: () => string | string;
    isEnabled?: () => boolean | boolean;
}
export interface PrefixedLogger {
    (): void;
    options: PrefixedLoggerParams;
    __src: string;
}
export default function makePrefixedLogger(prefix: Function | string, logFnParam: LogFn | PrefixedLoggerOptions, optionsParam?: PrefixedLoggerOptions): PrefixedLogger;
