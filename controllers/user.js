const userService = require('../services/user');

const createUserController = async (req, res, next) => {
  try {
    const response = await userService.createUser(req.body);
    res.status(201).json({ token: response });
  } catch (e) {
    console.log(e, 'aqui');
    if (e.code === 'invalid_arguments') {
      next({ status: 400, msg: e.msg });
    }
    if (e.code === 'user_exists') {
      console.log('entrei');
      next({ status: 409, msg: e.msg });
    }
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const response = await userService.userLogin(req.body, token);
    res.status(200).json({ token: response });
  } catch (e) {
    console.log(e, 'aqui');
    if (e.code === 'invalid_arguments') {
      next({ status: 400, msg: e.msg });
    }
    if (e.code === 'user_not_exists') {
      console.log('entrei');
      next({ status: 400, msg: e.msg });
    }
  }
};

const listUsersController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await userService.listUsers(id);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createUserController,
  loginUserController,
  listUsersController,
};