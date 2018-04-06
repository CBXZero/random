"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var randexp_1 = require("randexp");
var Random = /** @class */ (function () {
    function Random() {
    }
    Random.String = function (constraints) {
        if (constraints === void 0) { constraints = { minLength: 1, maxLength: 20 }; }
        var possibleChar = constraints.whiteListString == undefined ?
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" : constraints.whiteListString;
        constraints.blackListString =
            constraints.blackListString == undefined ? "" : constraints.blackListString;
        for (var i = 0; i < constraints.blackListString.length; i++) {
            possibleChar = possibleChar.replace(constraints.blackListString[i], "");
        }
        if (possibleChar.length == 0) {
            throw new Error("No Possible Characters");
        }
        constraints.minLength = constraints.minLength == undefined ? 1 : constraints.minLength;
        constraints.maxLength = constraints.maxLength == undefined ? constraints.minLength + 20 : constraints.maxLength;
        var length = Random.Number({ min: constraints.minLength, max: constraints.maxLength });
        var result = "";
        for (var i = 0; i < length; i++) {
            result += possibleChar.charAt(Math.floor((Math.random() * possibleChar.length)));
        }
        return result;
    };
    Random.RegexString = function (pattern, constraints) {
        if (constraints === void 0) { constraints = { maxRepetition: 100 }; }
        var generator = new randexp_1.RandExp(pattern);
        // constraints.maxRepetition = constraints.maxRepetition == undefined ? 100 : constraints.maxRepetition;
        // generator.max = constraints.maxRepetition;
        // generator.min
        //return generator.gen();
        return "";
    };
    Random.Number = function (constraints) {
        if (constraints === void 0) { constraints = { max: Number.MAX_VALUE, min: Number.MIN_VALUE }; }
        constraints.max = constraints.max == undefined ? Number.MAX_VALUE : constraints.max;
        constraints.min = constraints.min == undefined ? Number.MIN_VALUE : constraints.min;
        if (constraints.min > constraints.max) {
            throw new Error("Minimum value exceeds Maximum value");
        }
        return Math.floor(Math.random() * (constraints.max - constraints.min) + constraints.min);
    };
    Random.Boolean = function () {
        return Math.floor(Math.random() * 2) === 0 ? true : false;
    };
    Random.Object = function (typeData) {
        var result = new typeData();
        var properties = Object.getOwnPropertyNames(result);
        for (var i = 0; i < properties.length; i++) {
            var propertyType = typeof (result[properties[i]]);
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
    };
    return Random;
}());
exports.Random = Random;
