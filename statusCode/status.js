const OK = 200;
const CREATE = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const USER_EXIST = 409;
const INTERNAL_SERVER_ERROR = 500;
const MISSING_TOKEN = { message: 'Token not found' };
const JWT_BOD_FORMED = { message: 'Expired or invalid token' };
module.exports = {
  OK,
  CREATE,
  BAD_REQUEST,
  UNAUTHORIZED,
  USER_EXIST,
  INTERNAL_SERVER_ERROR,
  MISSING_TOKEN,
  JWT_BOD_FORMED,
};