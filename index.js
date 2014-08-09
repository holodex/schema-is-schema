var jjv = require('jjv')();

jjv.addSchema(require('./schemas/draft-04-schema'))

module.exports = function isSchema (schema, options) {
  options = options || {};

  var draft = options.draft || 4;
  
  var metaSchemaName = "http://json-schema.org/draft-0" +
    draft.toString() + "/schema#";

  var errors = jjv.validate(metaSchemaName, schema);

  if (errors) {
    return errors;
  } else {
    return true;
  }
};
