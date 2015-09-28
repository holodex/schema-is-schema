var genValidator = require('is-my-json-valid')

var schemas = require('./schemas')

module.exports = generateIsSchema

function generateIsSchema (options) {
  // default options to {}
  options = (options != null) ? options : {}

  var metaSchemaName = options.metaSchemaName
  // if meta schema name not given
  if (metaSchemaName == null) {
    var draft = options.draft
    // if draft not given
    if (draft == null) {
      // default to draft 4
      draft = 4
    }

    // meta schema name is draft default
    metaSchemaName = 'http://json-schema.org/draft-0' +
      draft.toString() + '/schema#'
  }

  return genValidator(schemas[metaSchemaName], options)
}
