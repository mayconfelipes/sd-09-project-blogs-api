const { User } = require('../models');
const { validateNewUser } = require('../middlewares/userValidation');
const { generateToken } = require('../middlewares/token');

const createNewUser = async (req, res, _next) => {
  const newUser = req.body;
  const invalidData = await validateNewUser(newUser);
  if (invalidData) return res.status(invalidData.status).json({ message: invalidData.message });

  await User.create(newUser).then((data) => {
    const { password: _, ...userWithoutPassword } = data;
    const token = generateToken(userWithoutPassword);
    
    res.status(201).json(token);
  });
};

const getUserByData = async (field, value) => {
  const user = await User.findOne({ where: { [field]: value } });
  console.log(user);
  return user;
};

module.exports = {
  createNewUser,
  getUserByData,
};
