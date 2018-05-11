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
        this.testString = ``;
        this.testBoolean = false;
    }
}

describe(`Random Library - Number`, () => {
    it(`Should not generate the same number twice`, () => {
        Assert.notEqual(Random.Number(), Random.Number());
    });

    it(`Should only return numbers less than or equal to the max number`, () => {
        Assert.isAtMost(Random.Number({max: 2}), 2);
    });

    it(`Should only return numbers greater than or equal to the min number`, () => {
        Assert.isAtLeast(Random.Number({min: Number.MAX_VALUE - 50}), Number.MAX_VALUE - 50);
    });

    it(`Should only return numbers between max and min inclusive`, () => {
        var min = 100;
        var max = 200;
        var result = Random.Number({min: 100, max: 200});
        Assert.isAtLeast(result, min);
        Assert.isAtMost(result, max);
    });

    it(`Should throw an error when min is greater than max`, () => {
        try {
            Random.Number({min:5, max: 1});
        } catch(ex) {
            return;
        }
        Assert.fail(`Error wasn't thrown`);
    });

    it(`Should return the number passed in when min and max are the same`, () => {
        var value = 5;
        var result = Random.Number({min: value, max: value});
        Assert.equal(result, value);
    });
});

describe(`Random Library - DecimalNumber`, () => {
    it(`Should not return the same number twice in a row`, () => {
        Assert.notEqual(Random.DecimalNumber(), Random.DecimalNumber());
    });

    it(`Should only return numbers less than or equal to the max number`, () => {
        Assert.isAtMost(Random.DecimalNumber({max: 2}), 2);
    });

    it(`Should only return numbers greater than or equal to the min number`, () => {
        Assert.isAtLeast(Random.DecimalNumber({min: Number.MAX_VALUE - 50}), Number.MAX_VALUE - 50);
    });

    it(`Should only return numbers between max and min inclusive`, () => {
        var min = 100;
        var max = 200;
        var result = Random.DecimalNumber({min: 100, max: 200});
        Assert.isAtLeast(result, min);
        Assert.isAtMost(result, max);
    });

    it(`Should throw an error when min is greater than max`, () => {
        try {
            Random.DecimalNumber({min:5, max: 1});
        } catch(ex) {
            return;
        }
        Assert.fail(`Error wasn't thrown`);
    });

    it(`Should return the number passed in when min and max are the same`, () => {
        var value = 5;
        var result = Random.DecimalNumber({min: value, max: value});
        Assert.equal(result, value);
    });
    
    it(`Should return a number with sufficient number of decimal places`, () => {
        var result = Random.DecimalNumber({min: 0, max: 1, maxDecimalPlaces: 10});
        Assert.isAtMost(result.toString().length, 12, `Improper length, output number was ${result}`);
    });
});

describe(`Random Library - String`, () => {
    it(`Should not generate the same string twice`, () => {
        Assert.notEqual(Random.String(), Random.String());
    });

    it(`Should not contain characters pased into exclusion string`, () => {
        var exclusionList = `abcdefghijklmnopqrstuvwxyz`;
        var result = Random.String({blackListString: exclusionList});
        for(var i = 0; i < exclusionList.length; i++) {
            Assert.notInclude(result, exclusionList[i]);
        }
    });

    it(`Should contain only characters passed into inclusion string`, () => {
        var inclusionList = `abcdefghijklmnopqrstuvwxyz`;
        var derivedExcludedCharacters = `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()`;
        var result = Random.String({whiteListString: inclusionList});
        for(var i = 0; i < derivedExcludedCharacters.length; i++) {
            Assert.notInclude(result, derivedExcludedCharacters[i]);
        }
    });

    it(`Should throw error when no characters are allowed`, () => {
        var inclusionList = ``;
        try {
            Random.String({whiteListString: inclusionList});
        } catch (ex) {
            return;
        }
        Assert.fail();
    });

    it(`Should create string of at least min length`, () => {
        var minLength = 5;
        var result = Random.String({minLength: minLength});
        Assert.isAtLeast(result.length, minLength);
    });

    it(`Should create string of at most max length`, () => {
        var maxLength = 100;
        var result = Random.String({maxLength: maxLength});
        Assert.isAtMost(result.length, maxLength);
    });
});

xdescribe(`Random Library - RegexString`, () => {
    it(`Should generate a string that matches the regex expression`, () => {
        var pattern = /hello World/g;
        var result = Random.RegexString(pattern);
        Assert.isTrue(pattern.test(result));
    });

    it(`Should generate a string that matches the regex expression and doesn't repeat characters exceeding max`, () => {
        var pattern = /hello World!*/g;
        var result = Random.RegexString(pattern, {maxRepetition: 10});
        Assert.isTrue(pattern.test(result), `Did not match pattern`);
        Assert.isTrue(result.length <= "hello world".length + 10, `Did not respect length constraints, ${result}`);
    });

    it(`Should generate a string that matches the regex expression and repeats characters at least min`, () => {
        var pattern = /hello World!*/g;
        var result = Random.RegexString(pattern, {minRepetition: 100, maxRepetition: 10000});
        Assert.isTrue(pattern.test(result), `Did not match pattern`);
        Assert.isTrue(result.length >= "hello world".length + 100, `Did not respect length constraints, ${result}`);
    });
});

describe(`Random Library - Boolean`, () => {
    it(`Should generate booleans close to 50/50`, () => {
        var results = [];
        for(var i=0; i < 100; i++) {
            results.push(Random.Boolean());
        };
        var trueCount = 0;
        var falseCount = 0;
        results.forEach(r => {
            r ? trueCount++ : falseCount++;
        });

        Assert.closeTo(trueCount, 50, 15);
        Assert.closeTo(falseCount, 50, 15);
    });
});

describe(`Random Library - Date`, () => {
    it(`Does not create the same date twice in a row`, () => {
        Assert.notEqual(Random.Date(), Random.Date());
    });

    it(`Creates a date that is at least before given date`, () => {
        var testDate = new Date();
        const result = Random.Date({before: testDate});
        Assert.isAtMost(result.valueOf(), testDate.valueOf(), `expected ${result} to be before ${testDate}`);
    });

    it(`Creates a date that is at least after given date`, () => {
        var testDate = new Date();
        const result = Random.Date({after: testDate});
        Assert.isAtLeast(result.valueOf(), testDate.valueOf(), `expected ${result} to be after ${testDate}`);
    });
});

describe(`Random Library - Object`, () => {
    it(`Should generate different objects`, () => {
        var firstTest = Random.Object(TestClass);
        var secondTest = Random.Object(TestClass);

        Assert.notDeepEqual(firstTest, secondTest);
    });
});

describe(`Random Library - Array`, () => {
    it(`Should return an array of correct type with two different objects`, () => {
        var result = Random.Array(TestClass, 2);

        Assert.notDeepEqual(result[0], result[1]);
    });

    it(`Should return an array of appropriate length`, () => {
        var result = Random.Array(TestClass, 500);
        Assert.equal(result.length, 500);
    });

    it(`Should return populated objects in the array`, () => {
        var result = Random.Array(TestClass, 1);
        Assert.isNotNull(result[0].testString);
    });

    it(`Should work with non-object Random Arrays`, () => {
        var result = Random.Array(String, 5);
        Assert.typeOf(result[0], "string");
    });
});