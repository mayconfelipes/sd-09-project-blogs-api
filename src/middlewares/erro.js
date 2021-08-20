const validate = require('./validators');

const BAD_REQUEST_STATUS = 400;
const CONFLICT_STATUS = 409;

const body = (req, _res, next) => validate.body(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: BAD_REQUEST_STATUS, message }));

const emailAlreadyExists = (req, _res, next) => validate.emailAlreadyExists(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: CONFLICT_STATUS, message }));

module.exports = {
  body,
  emailAlreadyExists,
};
