const loginServices = require('../services/loginServices');
const { ok } = require('../helpers/getHttpStatusCode');

const login = async (req, res, next) => {
  try {
    const token = await loginServices.login(req.body);
    return res.status(ok).json(token);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = { login };
