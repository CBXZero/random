export class Random {

    static String():string {
        var possibleChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        var length = Math.floor(Math.random() * 50) + 1;

        var result = "";
        for(var i=0; i < length; i++) {
            result += possibleChar.charAt(Math.floor((Math.random() * possibleChar.length)));
        }

        return result;
    }

    static Number(): number {
        return Math.floor(Math.random() * Number.MAX_VALUE);
    }

    static Boolean(): boolean {
        return Math.floor(Math.random() * 2) === 0 ? true : false;
    }

    static Object<T>(typeData: new () => T): T {
        var result = new typeData();
        var properties = Object.getOwnPropertyNames(result);
        for(var i=0; i < properties.length; i++) {
            var propertyType = typeof(result[properties[i]]);
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

        return result;
    } 
}