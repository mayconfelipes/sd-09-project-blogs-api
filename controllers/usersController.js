const usersService = require('../services/usersService');

const createUser = async (req, res, next) => {
  try {
    const user = req.body;
    const token = await usersService.createUser(user);
    return res.status(201).json({ token });
  } catch (err) { next(err); }
};

module.exports = {
  createUser,
};
