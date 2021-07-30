const users = require('../services/usersService');
const { BAD_REQUEST, CONFLICT } = require('../utils/httpStatus');

const create = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const result = await users.create({ displayName, email, password, image });
    return res.status(201).json(result);
  } catch (error) {
      if (error.type === CONFLICT) error.status = 409;
      if (error.type === BAD_REQUEST) error.status = 400;
    next(error);
  }
};

module.exports = {
  create,
};
