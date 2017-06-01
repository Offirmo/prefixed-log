# prefixed-log
[![NPM version](https://badge.fury.io/js/prefixed-log.png)](http://badge.fury.io/js/prefixed-log)
[![license](http://img.shields.io/badge/license-public_domain-brightgreen.png)](http://unlicense.org/)

A wrapper around a console.log compatible function to add a prefix to the output, ex.:
```
* [foo] hello !
* [foo] bye !

[1468917781403] > sending request...
[1468917781407] > handling response...
```
A common requirement when debugging.


The trick is that, when the 1st arg is a string :
* `console.log/warn/etc.` have a special interface which allows to replace `%d` placeholders with remaining params
* `console.log/warn/etc.` add a spacing between params when not using placeholder

This small lib take care of everything so that it looks nice.

## installation

```sh
npm i --save prefixed-log
```

Then in your code:
* node stable (4+): `const makePrefixedLogger = require('..').factory`
* node legacy (<4): `var makePrefixedLogger = require('../dist/index.node-legacy').factory`
* ES2015/ES6: `import { factory as makePrefixedLogger } from 'prefixed-log'`

Note: there are examples in folder `test/`

## Usage
Note: there are examples in folder `test/`

Simplest usage:
```js
import { factory as makePrefixedLogger } from 'prefixed-log'
const logger = makePrefixedLogger('* [foo]')

logger('Hello', 42)     --> * [foo] Hello 42
```

More advanced usage, specifying a logger:
```js
import { factory as makePrefixedLogger } from 'prefixed-log'
const logger = makePrefixedLogger('* [foo]', console.log.bind(console))

logger('Hello', 42)     --> * [foo] Hello 42
logger('Hello %d', 33)  --> * [foo] Hello 33
logger({foo: 'bar'})    --> * [foo] { foo: 'bar' }
```

Another advanced usage, using a dynamic prefix:
```js
import { factory as makePrefixedLogger } from 'prefixed-log'
const logger = makePrefixedLogger(() => Date.now(), console.log.bind(console))

logger('Hello', 42)     --> 1464255584287 Hello 42
logger('Hello %d', 33)  --> 1464255584288 Hello 33
```

### Options

There are secret options :

```js
const logger = makePrefixedLogger('* [foo]', {
  // default values :
  spacer: ' ',          ///< spacer that will be used between the prefix and the 1st arg *if it is a string*
  spacerAlt: '',        ///< spacer that will be used between the prefix and the 1st arg *if it is NOT a string*
  isEnabled: () => true ///< nothing will be displayed at all if it returns false (useful for disabling debug)
})
```
