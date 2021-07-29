const { validateUser, userLogin, getUsers } = require('../services/user');

const CODE_201 = 201;
const CODE_200 = 200;
const CODE_401 = 401;
const CODE_400 = 400;
const CODE_409 = 409;

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const createNewUser = await validateUser(displayName, email, password, image);
    return res.status(CODE_201).json(createNewUser);
  } catch (err) {
    if (err.message === 'User already registered') {
      return res.status(CODE_409).json({ message: err.message });
    }
    return res.status(CODE_400).json({
      message: err.message,
    });
  }
};

const newLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await userLogin(email, password);
    return res.status(CODE_200).json({ token: userData });
  } catch (err) {
    return res.status(CODE_400).json({ message: err.message });
  }
};

const findUsers = async (req, res) => {
  try {
    const users = await getUsers();
    return res.status(CODE_200).json(users);
  } catch (err) {
    return res.status(CODE_401).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  newLogin,
  findUsers,
};
