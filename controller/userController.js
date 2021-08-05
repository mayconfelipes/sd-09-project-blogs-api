const userServices = require('../services/userServices');
const jwt = require('../auth/jwt');

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
  const response = jwt.verify(authorization);
  if (response.error) return next(response.error);
  const users = await userServices.getAllUsers();
  console.log(users);
  return res.status(200).json(users);
};

module.exports = {
  addUserController,
  getUsers };