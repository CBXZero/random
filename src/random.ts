export static class Random {
    function randomString():string {
        var possibleChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        var length = Math.floor(Math.random() * 50) + 1;

        var result = "";
        for(var i=0; i < length; i++) {
            result += possibleChar.charAt(Math.floor((Math.random() * possibleChar.length)));
        }

        return result;
    }

    function randomNumber(): number {
        return Math.floor(Math.random() * Number.MAX_VALUE);
    }

    function randomBoolean(): boolean {
        return Math.floor(Math.random() * 2) === 0 ? true : false;
    }

    function randomObject<T>(typeData: new () => T): T {
        var result = new typeData();
        for(var i in Object.getOwnPropertyNames) {
            var propertyType = typeof(result[i]);
            switch (propertyType) {
                case "number":
                    result[i] = randomNumber();
                    break;
                case "boolean":
                    result[i] = randomBoolean();
                    break;
                case "string":
                    result[i] = randomString();
                    break;
                default:
                    result[i] = {};
                    break;
            }
        }

        return result;
    } 
}