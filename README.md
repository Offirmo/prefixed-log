# prefixed-log
A wrapper around a console.log compatible function to add a prefix to the output.

A common requirement when debugging. The trick is that, when the 1st arg is a string :
* `console.log/warn/etc.` have a special interface which allows to replace `%d` placeholders with remaining params
* `console.log/warn/etc.` add a spacing between params when not using placeholder
This small lib take care of everything so that it looks nice.

```js
const makePrefixedLogger = require('prefixed-log')

const logger = makePrefixedLogger('* [foo]', console.log.bind(console))

logger('Hello', 42)     --> * [foo] Hello 42
logger('Hello %d', 33)  --> * [foo] Hello 33
logger({foo: 'bar'})    --> * [foo] { foo: 'bar' }
```

Prefix can be a function :
```js
const makePrefixedLogger = require('prefixed-log')

const logger = makePrefixedLogger(() => Date.now(), console.log.bind(console))

logger('Hello', 42)     --> 1464255584287 Hello 42
logger('Hello %d', 33)  --> 1464255584288 Hello 33
```

### Options

There are secret options :

```js
const logger = makePrefixedLogger('* [foo]', console.log.bind(console), {
  // default values :
  spacer: ' ',          ///< spacer that will be used between the prefix and the 1st arg *if it is a string*
  spacerAlt: '',        ///< spacer that will be used between the prefix and the 1st arg *if it is NOT a string*
  isEnabled: () => true ///< nothing will be displayed at all if it returns false (useful for disabling debug)
})
```
