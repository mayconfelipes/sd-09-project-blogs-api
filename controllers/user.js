const userService = require('../services/user');

const createUserController = async (req, res, next) => {
  try {
    const response = await userService.createUser(req.body);
    res.status(200).json({ token: response });
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

module.exports = {
  createUserController,
};