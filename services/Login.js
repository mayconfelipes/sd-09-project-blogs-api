const { User } = require('../models');
const { JwtGenerator, CustomError, RequestValidator } = require('../middlewares');
const LoginSchema = require('../schemas/loginSchema');

const login = async (loginInfo) => {
  RequestValidator(LoginSchema, loginInfo);
  try {
    const { email: userEmail } = loginInfo;
    const userLogin = await User.findOne({ where: { email: userEmail } });
    const token = JwtGenerator(userLogin.toJSON());
    return token;
  } catch (err) {
    throw new CustomError('Invalid fields', 400);
  }
};

module.exports = {
  login,
};
