const { Users } = require('../models');
const { userSchema } = require('../schemas');

const emailAlreadyExists = async (email) => {
  const emailExists = await Users.findOne({ where: { email } });

  return emailExists
    ? {
        message: 'User already registered',
        statusCode: 409,
        error: true,
      }
    : false;
};

const createUser = async (displayName, email, password, image = null) => {
  const userValidation = userSchema.validate({ displayName, email, password });

  if (userValidation.error) return userValidation;

  const userExists = await emailAlreadyExists(email);

  if (userExists.error) return userExists;

  const newUser = await Users.create({
    displayName,
    email,
    password,
    image,
  });

  return newUser;
};

const passwordFilter = (arr) =>
  arr.reduce((acc, curr) => {
    const { password, ...noPassword } = curr;

    return [...acc, noPassword];
  }, []);

const getAllUsers = async () => {
  try {
    const allUsers = await Users.findAll();

    const formatUsers = allUsers.map(({ dataValues }) => dataValues);

    const noPasswordUser = passwordFilter(formatUsers);
    
    return noPasswordUser;
  } catch (err) {
    return { erro: true, message: err.message };
  }
};

module.exports = {
  createUser,
  getAllUsers,
};
