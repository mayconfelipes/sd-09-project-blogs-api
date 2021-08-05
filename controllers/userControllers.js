const userServices = require('../services/userServices');
const { created, ok } = require('../helpers/getHttpStatusCode');
const removeUsersPassword = require('../helpers/removeUsersPassword');

const createUser = async (req, res, next) => {
  try {
    const newUser = await userServices.createUser(req.body);
    return res.status(created).json(newUser);
  } catch (err) {
    return next(err);
  }
};

const findUsers = async (req, res, next) => {
  try {
    const users = await userServices.findUsers();
    const result = removeUsersPassword(users);
    return res.status(ok).json(result);
  } catch (err) {
    return next(err);
  }
};

module.exports = { createUser, findUsers };
