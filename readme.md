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

