var fs = require('fs')
var join = require('path').join

var schemas = {}

fs.readdirSync(__dirname)
  .filter(function (fileName) {
    return fileName !== 'index.js'
  })
  .map(function (schemaFileName) {
    return join(__dirname, schemaFileName)
  })
  .map(function (schemaPath) {
    return JSON.parse(
      fs.readFileSync(schemaPath, 'utf8')
    )
  })
  .forEach(function (schema) {
    schemas[schema.id] = schema
  })

module.exports = schemas
