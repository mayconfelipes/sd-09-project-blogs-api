const validate = require('../services/validators');

const user = (req, _res, next) => validate.userFields(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 400, message }));

const userExists = (req, _res, next) => validate.userExists(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 409, message }));

const login = (req, _res, next) => validate.login(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 400, message }));

const token = (req, _res, next) => validate.token(req.headers)
  .then((data) => { req.user = data; next(); })
  .catch(({ message }) => next({ status: 401, message }));

const category = (req, _res, next) => validate.category(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 400, message }));

const post = (req, _res, next) => validate.post(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 400, message }));

const categoryId = (req, _res, next) => validate.categoryId(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 400, message }));

const postExists = (req, _res, next) => validate.postExists(req.params)
  .then(() => next())
  .catch(({ message }) => next({ status: 404, message }));

const categoryIdsExists = (req, _res, next) => validate.categoryIdsExists(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 400, message }));

const authUser = (req, _res, next) => validate.authUser(req.params, req.user)
  .then(() => next())
  .catch(({ message }) => next({ status: 401, message }));

module.exports = {
  user,
  userExists,
  login,
  token,
  category,
  post,
  categoryId,
  postExists,
  categoryIdsExists,
  authUser,
};
