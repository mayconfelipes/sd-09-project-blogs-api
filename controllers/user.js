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

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user;
    await User.destroy({ where: { id: userId } });
    return res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  newUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
