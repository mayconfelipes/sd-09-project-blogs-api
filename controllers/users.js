const userService = require('../service/users');

const usersController = async (req, res, _next) => {
  const { displayName, email, password, image } = req.body;
  const response = await userService.createNewUser(displayName, email, password, image);
  res.status(201).json(response);
};

module.exports = usersController;
