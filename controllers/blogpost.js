const { serviceRegisterPost, serviceGetAll } = require('../services/blogpost.js');

const createPost = async (req, res, next) => {
  const { email } = req.decodedToken;
  try {
    const serviceResponse = await serviceRegisterPost(email, req.body);
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

const getAllPosts = async (req, res, next) => {
  try {
    const serviceResponse = await serviceGetAll();
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
  createPost,
  getAllPosts,
};