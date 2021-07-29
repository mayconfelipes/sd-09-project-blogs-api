const { Users } = require('../models');
// const userService = require('../services/userService');
// const status = require('../services/statusCode');

const getAllUsers = async (_req, res, next) => {
  try {
    // { include: { model: Users, as: 'blogposts' } }
    const listOfUsers = await Users.findAll();
    if (!listOfUsers) return res.status(404).send({ message: 'No users found' });
    return res.status(200).send(listOfUsers);
  } catch (error) {
    return next(error);
  }  
};

module.exports = {
  getAllUsers,
};