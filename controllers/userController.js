const {
  createUser,
} = require('../services/userService');

const code = require('../utils/codes');

const createUserController = async (req, res) => {
  const userToAdd = req.body;
  const result = await createUser(userToAdd);

  return res.status(code.CREATED).json(result);
};

module.exports = {
  createUserController,
};