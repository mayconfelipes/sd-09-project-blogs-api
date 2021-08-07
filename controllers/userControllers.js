const userServices = require('../services/userServices');

const created = 201;

const createNewUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const userInfos = { displayName, email, password, image };
  const response = await userServices.createNewUser(userInfos);
  const { error, status, message } = response;
  if (error) return res.status(status).json({ message });
  return res.status(created).json(response);
};

module.exports = {
  createNewUser,
};
