const userService = require('../services/userService');

const getAllUsers = async (_req, res, next) => {
  try {
    const data = await userService.findUsers();
    if (data.message) throw data;
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }  
};

const userObjectValidator = async (req, _res, next) => {
  try {
    const { displayName, email, password } = req.body;
    const data = userService.userObjectValidator(displayName, email, password);
    if (data.message) throw data;
    return next();
  } catch (error) {
    return next(error);
  }
};

const postUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const data = await userService.postUser(displayName, email, password, image);
    if (data.message) throw data;
    return res.status(201).json(data);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllUsers,
  userObjectValidator,
  postUser,
};