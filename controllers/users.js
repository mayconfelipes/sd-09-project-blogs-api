const userServices = require('../services/users');

const { CREATED_STATUS } = require('../middwares/httpStatus');

const create = async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await userServices.create(user);

    return res.status(CREATED_STATUS).json(newUser);
  } catch (err) {
    next(err);
}
};

module.exports = {
  create,
};