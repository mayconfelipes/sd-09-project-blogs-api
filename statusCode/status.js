const OK = 200;
const CREATE = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const USER_EXIST = 409;
const INTERNAL_SERVER_ERROR = 500;
const MISSING_TOKEN = { message: 'Token not found' };
const JWT_BOD_FORMED = { message: 'Expired or invalid token' };
const USER_NOT_EXIST = { message: 'User does not exist' };
module.exports = {
  OK,
  CREATE,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  USER_EXIST,
  INTERNAL_SERVER_ERROR,
  MISSING_TOKEN,
  JWT_BOD_FORMED,
  USER_NOT_EXIST,
};