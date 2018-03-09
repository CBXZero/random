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
});

describe("Random Library - String", () => {
    it("Should not generate the same string twice", () => {
        Assert.notEqual(Random.String(), Random.String());
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