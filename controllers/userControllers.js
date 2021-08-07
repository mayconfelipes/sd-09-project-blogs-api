const userServices = require('../services/userServices');

const created = 201;
const okay = 200;

const createNewUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const userInfos = { displayName, email, password, image };
  const response = await userServices.createNewUser(userInfos);
  const { error, status, message } = response;
  if (error) return res.status(status).json({ message });
  return res.status(created).json(response);
};

const getAllUsers = async (_req, res, next) => {
  try {
    const allUsers = await userServices.getAllUsers();
    return res.status(okay).json(allUsers);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createNewUser,
  getAllUsers,
};
