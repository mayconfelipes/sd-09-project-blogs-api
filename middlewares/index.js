const error = require('./error');
const validateUser = require('./validateUser');
const createToken = require('./createToken');
const checkEmailExists = require('./checkEmailExists');
const validateLogin = require('./validateLogin');
const validateToken = require('./validateToken');
const validateCategorie = require('./validateCategorie');

module.exports = {
    error,
    validateUser,
    createToken,
    checkEmailExists,
    validateLogin,
    validateToken,
    validateCategorie,
};