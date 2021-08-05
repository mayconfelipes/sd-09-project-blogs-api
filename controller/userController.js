const userServices = require('../services/userServices');

const addUserController = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const newUserData = { displayName, email, password, image };
  const response = await userServices.addUser(newUserData);
  console.log(response);
  if (response.error) return next(response.error);
  return res.status(201).json({ token: response.token });
};

const getUsers = async (req, res, next) => {
  const { authorization } = req.headers;
  const users = await userServices.getAllUsers(authorization);
  if (users.error) return next(users.error);
  console.log(users);
  return res.status(200).json(users);
};

const getUser = async (req, res, next) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const user = await userServices.getUserById({ authorization, id });
  if (user.error) return next(user.error);
  return res.status(200).json(user);
};

module.exports = {
  addUserController,
  getUsers,
  getUser };