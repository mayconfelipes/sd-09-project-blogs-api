const { User } = require('../models');
const { joiError, validateError, UserSchema } = require('../schemas');

const createUser = async (body) => {
  const { displayName, email, password, image } = body;
  
  const { error } = UserSchema.validate(body);
  if (error) throw joiError(400, error);

  const findUser = await User.findAll({
    where: { email },
  });
  if (findUser.length) throw validateError(409, 'User already registered');

  const newUser = await User.create({
    displayName,
    email,
    password,
    image,
  });

  return newUser;
};

module.exports = {
  createUser,
};
