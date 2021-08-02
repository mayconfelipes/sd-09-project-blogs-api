const { 
  serviceRegisterUser,
  serviceLoginUser,
  serviceGetAll,
  serviceGetUserById,
} = require('../services/user');

const getAllUsers = async (_req, res, next) => {
  try {
    const serviceResponse = await serviceGetAll();
    return res.status(200).json(serviceResponse);
  } catch (err) {
    return next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const serviceResponse = await serviceGetUserById(id);
    if (serviceResponse.status) {
      return next({
        status: serviceResponse.status,
        message: serviceResponse.message,
      });
    }
    return res.status(200).json(serviceResponse);
  } catch (err) {
    return next(err);
  }
};

const createUser = async (req, res, next) => {
  const user = req.body;
  try {
    const serviceResponse = await serviceRegisterUser(user);
    if (serviceResponse.status) {
      return next({
        status: serviceResponse.status,
        message: serviceResponse.message,
      });
    }
    return res.status(201).json(serviceResponse);
  } catch (err) {
    return next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const credentials = req.body;
    const serviceResponse = await serviceLoginUser(credentials);
    if (serviceResponse.status) {
      return next({
        status: serviceResponse.status,
        message: serviceResponse.message,
      });
    }
    return res.status(200).json(serviceResponse);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
};