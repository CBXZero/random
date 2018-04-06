import * as RandExp from 'randexp';

export class Random {

    static String(constraints: {blackListString?: string, whiteListString?: string, minLength?: number
    maxLength?: number} = {minLength: 1, maxLength: 20}):string {
        let possibleChar:string = constraints.whiteListString == undefined ? 
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" : constraints.whiteListString;
        
        constraints.blackListString = 
            constraints.blackListString == undefined ? "" : constraints.blackListString;
        
            for(var i=0; i < constraints.blackListString.length; i++) {
            possibleChar = possibleChar.replace(constraints.blackListString[i], "");
        }

        if(possibleChar.length == 0) {
            throw new Error("No Possible Characters");
        }

        constraints.minLength = constraints.minLength == undefined ? 1 : constraints.minLength;
        constraints.maxLength = constraints.maxLength == undefined ? constraints.minLength + 20 : constraints.maxLength;

        var length = Random.Number({min: constraints.minLength, max: constraints.maxLength});

        var result = "";
        for(var i=0; i < length; i++) {
            result += possibleChar.charAt(Math.floor((Math.random() * possibleChar.length)));
        }

        return result;
    }

    static RegexString(pattern: RegExp, constraints: {minRepetition?: number, maxRepetition?: number} = {minRepetition: 10, maxRepetition: 100}): string {
        var generator = new RandExp(pattern);
        constraints.minRepetition = constraints.minRepetition == undefined ? 10 : constraints.minRepetition;
        constraints.maxRepetition = constraints.maxRepetition == undefined ? 100 : constraints.maxRepetition;
        generator.max = constraints.maxRepetition;
        generator.min = constraints.minRepetition;
        return generator.gen();
    }

    static Number(constraints: {max?: number, min?: number} = {max: Number.MAX_VALUE, min: Number.MIN_VALUE}): number {
        return Math.floor(Random.DecimalNumber(constraints));
    }

    static DecimalNumber(constraints: {max?: number, min?: number, maxDecimalPlaces?: number} = {max:Number.MAX_VALUE, min: Number.MIN_VALUE}): number {
        constraints.max = constraints.max == undefined ? Number.MAX_VALUE : constraints.max
        constraints.min = constraints.min == undefined ? Number.MIN_VALUE : constraints.min

        if(constraints.min > constraints.max) {
            throw new Error("Minimum value exceeds Maximum value");
        }
        if(constraints.maxDecimalPlaces == null) {
            return Math.random() * (constraints.max - constraints.min) + constraints.min;
        }
        return parseFloat((Math.random() * (constraints.max - constraints.min) + constraints.min).toFixed(constraints.maxDecimalPlaces));
    }

    static Boolean(): boolean {
        return Math.floor(Math.random() * 2) === 0 ? true : false;
    }

    static Date(constraints: {before?: Date, after?: Date} = {before: new Date(8640000000000000), after: new Date(-8640000000000000)}): Date {
        var numberConstraints: {max?:number, min?:number} = {};
        numberConstraints.max = constraints.before == undefined ? 8640000000000000 : constraints.before.valueOf();
        numberConstraints.min = constraints.after == undefined ? -8640000000000000 : constraints.after.valueOf();
        return new Date(Random.Number(numberConstraints));
    }

    static Array<T>(typeData: new () => T, length: number): T[] {
        var results: T[] = [];
        for(var i=0; i < length; i++) {
            var objectToAdd = Random.Object<T>(typeData);
            results.push(objectToAdd);
        }
        return results;
    }

    static Object<T>(typeData: new () => T): T {
        var result = new typeData();
        var properties = Object.getOwnPropertyNames(result);
        for(var i=0; i < properties.length; i++) {
            var propertyType = typeof(result[properties[i]]);
            if(Object.getOwnPropertyDescriptor(result, properties[i]).writable == true) {
                switch (propertyType) {
                    case "number":
                        result[properties[i]] = this.Number();
                        break;
                    case "boolean":
                        result[properties[i]] = this.Boolean();
                        break;
                    case "string":
                        result[properties[i]] = this.String();
                        break;
                    default:
                        result[properties[i]] = {};
                        break;
                }
            }
        }

        return result;
    }
}