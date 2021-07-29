const rescue = require('express-rescue');
const validations = require('../middlewares/validations');
const usersService = require('../services/usersService');

const httpStatus = require('../middlewares/httpStatus');

const createUser = [ 
  validations.nameValidate,
  validations.emailValidate,
  validations.passwordValidate,
  validations.emailAlreadyExists,
  rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const user = await usersService.createUser({ displayName, email, password, image });

    return res.status(httpStatus.CREATED).json(user);
}),
];

const login = [
  validations.emptyInputs,
  validations.emailValidate,
  validations.passwordValidate,
  validations.userNotRegistered,
  rescue(async (req, res) => {
    const { email, password } = req.body;
    const userLogin = await usersService.login({ email, password });
    return res.status(httpStatus.OK).json(userLogin);
  }),
];

module.exports = {
  createUser,
  login,
};