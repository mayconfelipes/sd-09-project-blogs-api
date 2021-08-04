const userServices = require('../services/userServices');
const { created } = require('../helpers/getHttpStatusCode');

const createUser = async (req, res, next) => {
  // const { } = req.body;
  console.log('body ', req.body);
  try {
    const newUser = await userServices.createUser(req.body);
    return res.status(created).json(newUser);
  } catch (err) {
    return next(err);
  }
};

module.exports = { createUser };
