const InvalidArgumentError = require('./InvalidArgumentError');
const ConflictError = require('./ConflictError');
const AccessError = require('./AccessError');
const NotFoundError = require('./NotFoundError');
const JWTError = require('./JWTError');
const PermissionError = require('./PermissionError');
const ExtensionError = require('./ExtensionError');

module.exports = {
  InvalidArgumentError,
  ConflictError,
  AccessError,
  NotFoundError,
  JWTError,
  PermissionError,
  ExtensionError,
};
