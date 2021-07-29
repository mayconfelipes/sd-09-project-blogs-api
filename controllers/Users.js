const User = require('../services/Users');

const CREATED = 201;

const addUser = async (req, res) => {
  const userInfo = req.body;
  const token = await User.addUser(userInfo);

  return res.status(CREATED).json({ token });
};

module.exports = {
  addUser,
};
