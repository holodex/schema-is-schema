# schema-is-schema

returns whether or not an object is a [json-schema](http://json-schema.org).

supports

- [x] draft-04-schema

pull requests welcome!

## install

with [npm](http://npmjs.org), do:

```
npm i --save schema-is-schema
```

## isSchema(object, options)

returns either `true` or an `Object` of errors

### options

- `draft`: number of json-schema draft version (default: 4)

## example

```
var isSchema = require('schema-is-schema');

var personSchema = {
  id: "http://open.schema/Person#",
  properties: {
    name: {
      type: "string",
    },
  },
};

console.log(isSchema(personSchema))
// true

console.log(isSchema(null))
// { validation: { type: 'object' } }
```

## license

AGPLv3
