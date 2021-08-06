const userServices = require('../services/userServices');
const { created, ok } = require('../helpers/getHttpStatusCode');
const removeUsersPassword = require('../helpers/removeUsersPassword');
const filterUserData = require('../helpers/filterUserData');

const createUser = async (req, res, next) => {
  try {
    const token = await userServices.createUser(req.body);
    return res.status(created).json({ token });
  } catch (err) {
    return next(err);
  }
};

const findUsers = async (req, res, next) => {
  try {
    console.log('payload', req.user);
    const users = await userServices.findUsers();
    const result = removeUsersPassword(users);
    return res.status(ok).json(result);
  } catch (err) {
    return next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userServices.findById(id);

    const result = filterUserData(user);

    return res.status(ok).json(result);
  } catch (err) {
    return next(err);
  }
};

module.exports = { createUser, findUsers, findById };
