var test = require('tape')

var IsSchema

test('require module', function (t) {
  IsSchema = require('../')
  t.equal(typeof IsSchema, 'function', '`IsSchema` is a function')
  t.equal(typeof IsSchema(), 'function', '`IsSchema()` is a function')
  t.end()
})

test('undefined returns true', function (t) {
  var isSchema = IsSchema()
  t.equal(isSchema(undefined), true, undefined + ' is a schema')
  t.end()
})

test('non schemas return false', function (t) {
  var isSchema = IsSchema()
  ;[true, false, null, [1, 2, 3], '123', 123]
  .forEach(function (value) {
    t.equal(isSchema(value), false, value + ' is not a schema')
  })
  t.end()
})

test('bad schemas return false and give array errors', function (t) {
  var isSchema = IsSchema()
  t.equal(isSchema({
    type: 'thing'
  }), false, 'schema with type thing is a bad schema')
  t.equal(Array.isArray(isSchema.errors), true)
  t.equal(isSchema({
    id: 'Thing'
  }), false, 'schema with non-uri id is a bad schema')
  t.equal(Array.isArray(isSchema.errors), true)
  t.end()
})

test('good schemas return true and give null errors', function (t) {
  var isSchema = IsSchema()
  t.equal(isSchema({
    type: 'string'
  }), true, 'string schema is schema')
  t.equal(Array.isArray(isSchema.errors), false)
  t.equal(isSchema({
    type: 'array',
    items: {
      type: 'string'
    }
  }), true, 'array of string schema is schema')
  t.equal(isSchema({
    id: 'http://example.org/Person#',
    properties: {
      name: {
        type: 'string'
      }
    }
  }), true, 'Person schema is schema')
  t.equal(isSchema({
    $ref: 'Person'
  }), true, 'Person reference schema is schema')
  t.equal(isSchema({
    oneOf: [{
      $ref: 'Person'
    }, {
      type: 'array',
      items: {
        $ref: 'Person'
      }
    }]
  }), true, 'oneOf Person or many Persons schema is schema')
  t.end()
})

test('schemas with extra props', function (t) {
  var isSchema = IsSchema()
  t.equal(isSchema({
    context: 'vocab:name',
    type: 'string'
  }), true, 'string schema with context is schema')
  t.equal(isSchema({
    reverse: 'owner',
    $ref: 'Resource'
  }), true, 'Person knows schema is schema')
  t.equal(isSchema({
    type: 'array',
    context: 'vocab:followers',
    items: {
      reverse: 'follows',
      $ref: 'Person'
    }
  }), true, 'Person follows schema is schema')
  t.equal(isSchema({
    id: 'http://example.org/Person#',
    prefixes: {
      'vocab': 'http://open.vocab/'
    },
    properties: {
      name: {
        context: 'vocab:name',
        type: 'string'
      }
    }
  }), true, 'Person schema with linked data context is schema')
  t.end()
})
