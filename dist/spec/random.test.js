"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var random_1 = require("./../random");
var chai = require("chai");
var Assert = chai.assert;
var TestClass = /** @class */ (function () {
    function TestClass() {
        this.testNumber = 0;
        this.testString = "";
        this.testBoolean = false;
    }
    return TestClass;
}());
describe("Random Library - Number", function () {
    it("Should not generate the same number twice", function () {
        Assert.notEqual(random_1.Random.Number(), random_1.Random.Number());
    });
    it("Should only return numbers less than or equal to the max number", function () {
        Assert.isAtMost(random_1.Random.Number({ max: 2 }), 2);
    });
    it("Should only return numbers greater than or equal to the min number", function () {
        Assert.isAtLeast(random_1.Random.Number({ min: Number.MAX_VALUE - 50 }), Number.MAX_VALUE - 50);
    });
    it("Should only return numbers between max and min inclusive", function () {
        var min = 100;
        var max = 200;
        var result = random_1.Random.Number({ min: 100, max: 200 });
        Assert.isAtLeast(result, min);
        Assert.isAtMost(result, max);
    });
    it("Should throw an error when min is greater than max", function () {
        try {
            random_1.Random.Number({ min: 5, max: 1 });
        }
        catch (ex) {
            return;
        }
        Assert.fail("Error wasn't thrown");
    });
    it("Should return the number passed in when min and max are the same", function () {
        var value = 5;
        var result = random_1.Random.Number({ min: value, max: value });
        Assert.equal(result, value);
    });
});
describe("Random Library - String", function () {
    it("Should not generate the same string twice", function () {
        Assert.notEqual(random_1.Random.String(), random_1.Random.String());
    });
    it("Should not contain characters pased into exclusion string", function () {
        var exclusionList = "abcdefghijklmnopqrstuvwxyz";
        var result = random_1.Random.String({ blackListString: exclusionList });
        for (var i = 0; i < exclusionList.length; i++) {
            Assert.notInclude(result, exclusionList[i]);
        }
    });
    it("Should contain only characters passed into inclusion string", function () {
        var inclusionList = "abcdefghijklmnopqrstuvwxyz";
        var derivedExcludedCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        var result = random_1.Random.String({ whiteListString: inclusionList });
        for (var i = 0; i < derivedExcludedCharacters.length; i++) {
            Assert.notInclude(result, derivedExcludedCharacters[i]);
        }
    });
    it("Should throw error when no characters are allowed", function () {
        var inclusionList = "";
        try {
            random_1.Random.String({ whiteListString: inclusionList });
        }
        catch (ex) {
            return;
        }
        Assert.fail();
    });
    it("Should create string of at least min length", function () {
        var minLength = 5;
        var result = random_1.Random.String({ minLength: minLength });
        Assert.isAtLeast(result.length, minLength);
    });
    it("Should create string of at most max length", function () {
        var maxLength = 100;
        var result = random_1.Random.String({ maxLength: maxLength });
        Assert.isAtMost(result.length, maxLength);
    });
});
describe("Random Library - RegexString", function () {
    it("Should generate a string that matches the regex expression", function () {
        var pattern = /hello World/g;
        var result = random_1.Random.RegexString(pattern);
        Assert.isTrue(pattern.test(result));
    });
    it("Should generate a string that matches the regex expression and doesn't repeat characters exceeding max", function () {
        var pattern = /hello World!*/g;
        var result = random_1.Random.RegexString(pattern, { maxRepetition: 10 });
        Assert.isTrue(pattern.test(result), "Did not match pattern");
        Assert.isTrue(result.length <= "hello world".length + 10, "Did not respect length constraints, " + result);
    });
    it("Should generate a string that matches the regex expression and repeats characters at least min", function () {
        var pattern = /hello World!*/g;
        var result = random_1.Random.RegexString(pattern, { minRepetition: 100, maxRepetition: 10000 });
        Assert.isTrue(pattern.test(result), "Did not match pattern");
        Assert.isTrue(result.length >= "hello world".length + 100, "Did not respect length constraints, " + result);
    });
});
describe("Random Library - Boolean", function () {
    it("Should generate booleans close to 50/50", function () {
        var results = [];
        for (var i = 0; i < 100; i++) {
            results.push(random_1.Random.Boolean());
        }
        ;
        var trueCount = 0;
        var falseCount = 0;
        results.forEach(function (r) {
            r ? trueCount++ : falseCount++;
        });
        Assert.closeTo(trueCount, 50, 10);
        Assert.closeTo(falseCount, 50, 10);
    });
});
describe("Random Library - Object", function () {
    it("Should generate different objects", function () {
        var firstTest = random_1.Random.Object(TestClass);
        var secondTest = random_1.Random.Object(TestClass);
        Assert.notDeepEqual(firstTest, secondTest);
    });
});
