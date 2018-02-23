"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Random = /** @class */ (function () {
    function Random() {
    }
    Random.randomString = function () {
        var possibleChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        var length = Math.floor(Math.random() * 50) + 1;
        var result = "";
        for (var i = 0; i < length; i++) {
            result += possibleChar.charAt(Math.floor((Math.random() * possibleChar.length)));
        }
        return result;
    };
    Random.randomNumber = function () {
        return Math.floor(Math.random() * Number.MAX_VALUE);
    };
    Random.randomBoolean = function () {
        return Math.floor(Math.random() * 2) === 0 ? true : false;
    };
    Random.randomObject = function (typeData) {
        var result = new typeData();
        for (var i in Object.getOwnPropertyNames(result)) {
            var propertyType = typeof (result[i]);
            switch (propertyType) {
                case "number":
                    result[i] = this.randomNumber();
                    break;
                case "boolean":
                    result[i] = this.randomBoolean();
                    break;
                case "string":
                    result[i] = this.randomString();
                    break;
                default:
                    result[i] = {};
                    break;
            }
        }
        return result;
    };
    return Random;
}());
exports.Random = Random;
