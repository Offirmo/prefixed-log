export interface PrefixedLogger {
    (): void;
    __src: string;
}
export default function makePrefixedLogger(prefix: Function | string, logFn: any, options?: {}): PrefixedLogger;
