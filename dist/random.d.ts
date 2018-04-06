export declare class Random {
    static String(constraints?: {
        blackListString?: string;
        whiteListString?: string;
        minLength?: number;
        maxLength?: number;
    }): string;
    static RegexString(pattern: RegExp, constraints?: {
        minRepetition?: number;
        maxRepetition?: number;
    }): string;
    static Number(constraints?: {
        max?: number;
        min?: number;
    }): number;
    static DecimalNumber(constraints?: {
        max?: number;
        min?: number;
        maxDecimalPlaces?: number;
    }): number;
    static Boolean(): boolean;
    static Date(constraints?: {
        before?: Date;
        after?: Date;
    }): Date;
    static Array<T>(typeData: new () => T, length: number): T[];
    static Object<T>(typeData: new () => T): T;
}
