const { User } = require('../models');
const { schema, validateError } = require('./schemas/loginSchema');
const { badRequest } = require('../helpers/getHttpStatusCode');
const filterUserData = require('../helpers/filterUserData');
const { generateToken } = require('../helpers/manageJwt');

const login = async (userData) => {
  const { email, password } = userData;

  const { error } = schema.validate(userData);
  if (error) throw validateError(badRequest, error.message);

  const user = await User.findOne({ where: { email, password } });

  if (!user) throw validateError(badRequest, 'Invalid fields');

  const data = filterUserData(user.dataValues);

  // const token = jwt.sign(data, JWT_SECRET, jwtConfig);
  const token = generateToken(data);

  return token;
};

module.exports = { login };
