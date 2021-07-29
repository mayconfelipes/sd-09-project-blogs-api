const userServices = require('../services/userServices');

const postNewUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const userData = { displayName, email, password, image };

  try {
    const token = await userServices.postNewUser(userData);

    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postNewUser,
};