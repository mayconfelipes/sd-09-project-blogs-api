const validate = require('../services/validators');

const user = (req, _res, next) => validate.user(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 400, message }));

const userExists = (req, _res, next) => validate.userExists(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 409, message }));

const login = (req, _res, next) => validate.login(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 400, message }));

module.exports = { user, userExists, login };
