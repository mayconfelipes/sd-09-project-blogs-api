const rescue = require('express-rescue');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const { User } = require('../models');

const { sequelize } = require('../models');

const setNew = rescue(async (req, res, next) => {
    const { error } = joi.object({
        displayName: joi.string().min(8),
        email: joi.string().email().required(),
        password: joi.string().min(6)
        .message('{#label} length must be 6 characters long').required(),
        image: joi.string(),
    }).validate(req.body);

    /*
    as Roz said during a lesson, without try-catch method, we should
    be sure to pass next to call the error's middleware
    */
    if (error) return next(error);

    const { displayName, email, password, image } = req.body;
    
    const doesUserExist = await User.findOne({ where: { email } });
    
    if (doesUserExist) return next({ message: 'User already registered', code: 409 });
    
    const createdUser = await sequelize.transaction(async (transaction) => (
        User.create({ displayName, email, password, image }, { transaction })));

    const token = jwt.sign(createdUser.email, process.env.JWT_SECRET);

    res.status(StatusCodes.CREATED).json({ token });
});

const getAll = rescue(async (_req, res) => {
  const users = await User.findAll();

  res.status(StatusCodes.OK).json(users);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  if (!user) return res.status(404).json({ message: 'User does not exist' });

  res.status(StatusCodes.OK).json(user);
});

const deleteUser = rescue(async (req, res) => {
  const { email } = req;

  await sequelize.transaction(async (transaction) => User
    .destroy({ where: { email } }, { transaction }));
  
  res.sendStatus(StatusCodes.NO_CONTENT);
});

module.exports = {
  setNew,
  getAll,
  getById,
  deleteUser,
};
