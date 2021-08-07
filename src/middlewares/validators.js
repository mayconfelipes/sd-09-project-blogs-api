const validate = require('../utils/validators');

const user = (req, _res, next) => validate.user(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 400, message }));

const userDB = (req, _res, next) => validate.userDB(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 409, message }));

const login = (req, _res, next) => validate.login(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 400, message }));

const token = (req, _res, next) => validate.token(req.headers)
  .then((data) => { req.user = data; next(); })
  .catch(({ message }) => next({ status: 401, message }));

const userExist = (req, _res, next) => validate.userExist(req.params)
  .then(() => next())
  .catch(({ message }) => next({ status: 404, message }));

const category = (req, _res, next) => validate.category(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 400, message }));

const post = (req, _res, next) => validate.post(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 400, message }));

const categIds = (req, _res, next) => validate.categIds(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 400, message }));

const postExist = (req, _res, next) => validate.postExist(req.params)
  .then(() => next())
  .catch(({ message }) => next({ status: 404, message }));

const categIdsReq = (req, _res, next) => validate.categIdsReq(req.body)
  .then(() => next())
  .catch(({ message }) => next({ status: 400, message }));

const authUser = (req, _res, next) => validate.authUser(req.params, req.user)
  .then(() => next())
  .catch(({ message }) => next({ status: 401, message }));

module.exports = {
  user, userDB, login, token, userExist, category, post, categIds, postExist, categIdsReq, authUser,
};
