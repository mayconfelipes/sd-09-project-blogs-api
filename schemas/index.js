const SchemaUser = require('./schemaUser');
const SchemaLogin = require('./schemaLogin');
const { validateUser, validateCategory } = require('./schemaBlogPost');

module.exports = { SchemaUser, SchemaLogin, validateUser, validateCategory };
