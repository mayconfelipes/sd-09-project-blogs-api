const User = require('../services/userService');

const addUser = async (req, res) => {
  const userData = req.body;
  try {
    const createUser = await User.addUser(userData);
    if (createUser.error) {
      return res.status(createUser.error.code)
      .json({ message: createUser.error.message });
    }
    return res.status(201).json(createUser);
  } catch (error) {
    console.log('Deu ruim');
    res.status(500).json({ message: 'Internal Error', error });
  }
};

module.exports = {
  addUser,
};