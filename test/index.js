var test = require('tape');

var isSchema;

test("require module", function (t) {
  isSchema = require('../');
  t.ok(isSchema);
  t.end();
});

test("non schemas", function (t) {
  t.notEqual(isSchema(true), true, "true is not schema");
  t.notEqual(isSchema(false), true, "false is not schema");
  t.notEqual(isSchema(null), true, "null is not schema");
  t.notEqual(isSchema(undefined), true, "undefined is not schema");
  t.notEqual(isSchema([1,2,3]), true, "array is not schema");
  t.notEqual(isSchema("123"), true, "string is not schema");
  t.notEqual(isSchema(123), true, "number is not schema");
  t.end();
});

test("schemas", function (t) {
  t.equal(isSchema({
    type: "string",
  }), true, "string schema is schema");
  t.equal(isSchema({
    type: "array",
    items: {
      type: "string"
    },
  }), true, "array of string schema is schema");
  t.equal(isSchema({
    id: "http://example.org/Person#",
    properties: {
      name: {
        type: "string",
      },
    },
  }), true, "Person schema is schema");
  t.equal(isSchema({
    $ref: "Person",
  }), true, "Person reference schema is schema");
  t.equal(isSchema({
    oneOf: [{
      $ref: "Person",
    }, {
      type: "array",
      items: {
        $ref: "Person",
      },
    }],
  }), true, "oneOf Person or many Persons schema is schema");
  t.end();
});

test("schemas with extra props", function (t) {
  t.equal(isSchema({
    context: "vocab:name",
    type: "string",
  }), true, "string schema with context is schema");
  t.equal(isSchema({
    reverse: "owner",
    $ref: "Resource",
  }), true, "Person knows schema is schema");
  t.equal(isSchema({
    type: "array",
    context: "vocab:followers",
    items: {
      reverse: "follows",
      $ref: "Person",
    },
  }), true, "Person follows schema is schema");
  t.equal(isSchema({
    id: "http://example.org/Person#",
    prefixes: {
      "vocab": "http://open.vocab/",
    },
    properties: {
      name: {
        context: "vocab:name",
        type: "string",
      },
    },
  }), true, "Person schema with linked data context is schema");
  t.end();
});
