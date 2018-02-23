export declare class Random {
    static randomString(): string;
    static randomNumber(): number;
    static randomBoolean(): boolean;
    static randomObject<T>(typeData: new () => T): T;
}
