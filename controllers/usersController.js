const { createNewUser, getAllUsers } = require('../middlewares/users');
const { validateNewUser } = require('../middlewares/userValidation');
const { validateToken } = require('../middlewares/token');

const createUser = async (req, res, _next) => {
  const newUser = req.body;

  const invalidData = await validateNewUser(newUser);
  if (invalidData) return res.status(invalidData.status).json({ message: invalidData.message });

  const response = await createNewUser(newUser);
  console.log(response);
  return res.status(201).json(response);
};

const listAllUsers = async (req, res, _next) => {
  const token = req.headers.authorization;
  console.log(token);

  const isTokenValid = await validateToken(token);
  if (isTokenValid.status) return res.status(401).json({ message: isTokenValid.message });

  const response = await getAllUsers();
  return res.status(200).json(response);
};

module.exports = {
  createUser,
  listAllUsers,
};
