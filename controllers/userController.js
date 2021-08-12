const code = require('../utils/codes');
const {
  createUser,
  loginService,
} = require('../services/userService');

const createUserController = async (req, res) => {
  const userToAdd = req.body;
  const result = await createUser(userToAdd);

  return res.status(code.CREATED).json(result);
};

const loginController = async (req, res) => {
  const user = req.body;
  const token = await loginService(user);
  // console.log("Login crontroller--------------------")
  return res.status(code.OK).json(token);
};

module.exports = {
  createUserController,
  loginController,
};