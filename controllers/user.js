const { User } = require('../models/index');
const { tokenGenerator } = require('../middlewares/index');

const newUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUserInfo = { displayName, email, password, image };
     await User.create(newUserInfo);
    return res.status(201).send({ token: tokenGenerator({ email, password }) });
  } catch (error) {
    console.error(error);
    return res.status(304).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  newUser,
  getAllUsers,
};
