import { Random } from './../random';

import * as mocha from 'mocha';
import * as chai from 'chai';

const Assert = chai.assert;

class TestClass {
    testNumber: number;
    testString: string;
    testBoolean: boolean;
    constructor() {
        this.testNumber = 0;
        this.testString = "";
        this.testBoolean = false;
    }
}

describe("Random Library - Number", () => {
    it("Should not generate the same number twice", () => {
        Assert.notEqual(Random.Number(), Random.Number());
    });

    it("Should only return numbers less than or equal to the max number", () => {
        Assert.isAtMost(Random.Number({max: 2}), 2);
    });

    it("Should only return numbers greater than or equal to the min number", () => {
        Assert.isAtLeast(Random.Number({min: Number.MAX_VALUE - 50}), Number.MAX_VALUE - 50);
    });

    it("Should only return numbers between max and min inclusive", () => {
        var min = 100;
        var max = 200;
        var result = Random.Number({min: 100, max: 200});
        Assert.isAtLeast(result, min);
        Assert.isAtMost(result, max);
    });

    it("Should throw an error when min is greater than max", () => {
        try {
            Random.Number({min:5, max: 1});
        } catch(ex) {
            return;
        }
        Assert.fail("Error wasn't thrown");
    });

    it("Should return the number passed in when min and max are the same", () => {
        var value = 5;
        var result = Random.Number({min: value, max: value});
        Assert.equal(result, value);
    })
});

describe("Random Library - String", () => {
    it("Should not generate the same string twice", () => {
        Assert.notEqual(Random.String(), Random.String());
    });

    it("Should not contain characters pased into exclusion string", () => {
        var exclusionList = "abcdefghijklmnopqrstuvwxyz";
        var result = Random.String({blackListString: exclusionList});
        for(var i = 0; i < exclusionList.length; i++) {
            Assert.notInclude(result, exclusionList[i]);
        }
    });

    it("Should contain only characters passed into inclusion string", () => {
        var inclusionList = "abcdefghijklmnopqrstuvwxyz";
        var derivedExcludedCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        var result = Random.String({whiteListString: inclusionList});
        for(var i = 0; i < derivedExcludedCharacters.length; i++) {
            Assert.notInclude(result, derivedExcludedCharacters[i]);
        }
    });

    it("Should throw error when no characters are allowed", () => {
        var inclusionList = "";
        try {
            Random.String({whiteListString: inclusionList});
        } catch (ex) {
            return;
        }
        Assert.fail();
    });

    it("Should create string of at least min length", () => {
        var minLength = 5;
        var result = Random.String({minLength: minLength});
        Assert.isAtLeast(result.length, minLength);
    });

    it("Should create string of at most max length", () => {
        var maxLength = 100;
        var result = Random.String({maxLength: maxLength});
        Assert.isAtMost(result.length, maxLength);
    });
});

describe("Random Library - Boolean", () => {
    it("Should generate booleans close to 50/50", () => {
        var results = [];
        for(var i=0; i < 100; i++) {
            results.push(Random.Boolean());
        };
        var trueCount = 0;
        var falseCount = 0;
        results.forEach(r => {
            r ? trueCount++ : falseCount++;
        });

        Assert.closeTo(trueCount, 50, 10);
        Assert.closeTo(falseCount, 50, 10);
    });
});

describe("Random Library - Object", () => {
    it("Should generate different objects", () => {
        var firstTest = Random.Object(TestClass);
        var secondTest = Random.Object(TestClass);

        Assert.notDeepEqual(firstTest, secondTest);
    });
});