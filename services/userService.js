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
  arr
    .map(({ dataValues }) => dataValues)
    .reduce((acc, curr) => {
      const { password, ...noPassword } = curr;

      return [...acc, noPassword];
    }, []);

const getAllUsers = async () => {
  try {
    const allUsers = await Users.findAll();

    const noPasswordUser = passwordFilter(allUsers);

    return noPasswordUser;
  } catch (err) {
    return { erro: true, message: err.message };
  }
};

const getUserById = async (id) => {
  const user = await Users.findByPk(id);

  const noPasswordUser = user && passwordFilter([user])[0];

  return (
    noPasswordUser || {
      error: true,
      message: 'User does not exist',
      statusCode: 404,
    }
  );
};

const getUserByEmail = async (email) => Users.findOne({ where: { email } });

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
};
