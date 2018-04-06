# Random Test Values

[![Build Status](https://travis-ci.org/CBXZero/random.svg?branch=master)](https://travis-ci.org/CBXZero/random)

## Installing

```
npm install random-test-values --save
```

## Using the Library
```ts
import { Random } from 'random-test-values';

var someNumber: number = Random.Number();
var someString: string = Random.String();
var someBool: boolean = Random.Boolean();
var someObject: SomeType = Random.Object(SomeType);
```

## Method Breakdown

### String

By default the only characters in a generated string are alphanumeric characters of any case.

```ts
// Generate a random String
Random.String();

// Specify a min/max length for the string
Random.String({minLength: 5, maxLength: 50});

// Specify characters that are allowed in generated string
Random.String({whiteListString: "1234567890"}); // Would only generate numbers

// Specify characters to exclude in generated string
Random.String({blackListString: "1234567890"}); // Would only generate alpha strings
```

### RegexString

Uses the library https://github.com/fent/randexp.js? to generate strings that match a pattern

```ts
Random.RegexString(/hello World/); // Would generate "hello World"
Random.RegexString(/hello World!*/, {minRepetition: 500}); // Would Generate "hello World" with 500+ "!"

```

### Number

Generates an integer

```ts
Random.Number(); // Creates a random integer
Random.Number({min: 5, max: 20}); // Generates a number between 5 and 20
```

### DecimalNumber

Like Number but generates a decimal n umber

```ts
Random.DecimalNumber(); // Creates a random decimal number
Random.DecimalNumber({min: 5, max: 20, maxDecimalPlaces: 2}); // Creates a random decimal number between 5 and 20, rounding to 2 decimal places.
```

### Boolean

Creates a random boolean, not the best for testing though.

```ts
Random.Boolean(); // Creates a boolean, either true or false.
```

### Date

Creates a random valid date.

```ts
Random.Date(); // Creates a Date
Random.Date({after: new Date(), before: new Date()}); // Creates a date between the after and before dates
```

### Array

Creates a random array of specified length and type

```ts
Random.Array(TestObject, 3); // Creates an array of TestObject of length 3
Random.Array(String, 5); // Creates an array of Strings of length 5
```

### Object

Creates a random object of a given type

NOTE: Object properties must be initilized in the constructor of the class, otherwise they will not be randomly assigned in Random.Object!

```ts
Random.Object(TestObject); // Creates a random TestObject
```