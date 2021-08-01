const error = require('./error');
const validateUser = require('./validateUser');
const createToken = require('./createToken');
const checkEmailExists = require('./checkEmailExists');

module.exports = {
    error,
    validateUser,
    createToken,
    checkEmailExists,
};