const userServices = require('../services/userServices');

const addUserController = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const newUserData = { displayName, email, password, image };
  const response = await userServices.addUser(newUserData);
  console.log(response);
  if (response.error) return next(response.error);
  return res.status(201).json({ token: response.token });
};

module.exports = {
  addUserController };