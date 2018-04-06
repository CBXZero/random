export declare class Random {
    static String(constraints?: {
        blackListString?: string;
        whiteListString?: string;
        minLength?: number;
        maxLength?: number;
    }): string;
    static RegexString(pattern: RegExp, constraints?: {
        maxRepetition?: number;
    }): string;
    static Number(constraints?: {
        max?: number;
        min?: number;
    }): number;
    static Boolean(): boolean;
    static Object<T>(typeData: new () => T): T;
}
