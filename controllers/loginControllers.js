const loginServices = require('../services/loginServices');
const { created } = require('../helpers/getHttpStatusCode');

const login = async (req, res, next) => {
  try {
    const token = await loginServices.login(req.body);
    return res.status(created).json(token);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = { login };
