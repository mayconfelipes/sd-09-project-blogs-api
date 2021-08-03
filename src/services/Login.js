const jwt = require('jsonwebtoken');
const User = require('./User');

const jwtSecret = process.env.JWT_SECRET;

const log = async (inputEmail, password) => {
  const user = await User.getByEmail(inputEmail);

  if (!user) return { err: { message: 'Invalid fields' } };

  if (password !== user.dataValues.password) return { err: { message: 'Invalid fields' } };
  
  const { id, displayName, email, image } = user.dataValues;
  
  const jwtPayload = { id, displayName, email, image };
  const jwtConfig = { algorithm: 'HS256' };
  const token = jwt.sign(jwtPayload, jwtSecret, jwtConfig);

  return { token };
};

module.exports = {
  log,
};
