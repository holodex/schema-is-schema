# schema-is-schema

returns whether or not an object is a [json-schema](http://json-schema.org).

supports

- [x] draft-04-schema
- [x] draft-04-schema-no-id-format

pull requests welcome!

## install

with [npm](http://npmjs.org), do:

```
npm i --save schema-is-schema
```

## generateIsSchema(options)

returns an [`is-my-json-valid`](https://github.com/mafintosh/is-my-json-valid) `validate` function, which returns `true` if a schema is valid. get the last list of errors by checking `validate.errors`.

### options

- `draft`: number of json-schema draft version (default: 4)

or any options accepted by [`is-my-json-valid`](https://github.com/mafintosh/is-my-json-valid).

## example

```
var isSchema = require('schema-is-schema')()

var personSchema = {
  id: "http://open.schema/Person#",
  properties: {
    name: {
      type: "string"
    }
  }
}

console.log(isSchema(personSchema))
// true

console.log(isSchema(null))
// false
console.loG(isSchema.errors)
// [ { field: 'data', message: 'is the wrong type' } ]
```

## license

ISC
