const userServices = require('../services/users');

const { CREATED_STATUS, OK_STATUS } = require('../middwares/httpStatus');

const create = async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await userServices.create(user);

    return res.status(CREATED_STATUS).json(newUser);
  } catch (err) {
    next(err);
}
};

const login = async (req, res, next) => {
  try {
    const user = req.body;
    const token = await userServices.login(user);

    return res.status(OK_STATUS).json(token);
  } catch (err) {
    next(err);
  }
};

const findAll = async (_req, res, next) => {
  try {
    const allUsers = await userServices.findAll();

    return res.status(OK_STATUS).json(allUsers);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  findAll,
  login,
};