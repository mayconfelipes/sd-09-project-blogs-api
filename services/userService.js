const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const { validateError } = require('../helpers/Ultis');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

// metodo de validaçao retirado do codigo do aluno mauro henrique turma sd-09
const schemaUser = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

// const schemaUserLogin = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().length(6).required(),
// });

const createUser = async (displayName, email, password, image) => {
   const { error } = schemaUser.validate({ displayName, email, password });
   console.error(error.details); 
  if (error) {
   // const qualquernome = error.details[0].message;
    throw validateError(400, error.details[0].message);
  }

  const user = await Users.findOne({ where: { email } });

  if (user) {
    throw validateError(409, 'User already registered');
  }

  const newUser = await Users.create({ displayName, email, password, image });

  const { password: _, ...userWithoutPassword } = newUser.dataValues;

  const token = jwt.sign(userWithoutPassword, secret, jwtConfig);

  return token;
};

// const userLogin = async (email, password) => {
//   const { error } = schemaUserLogin.validate({ email, password });

//   if (error) {
//     throw validateError(400, error.details[0].message);
//   }

//   const login = await Users.findOne({ where: { email, password } });

//   if (!login) {
//     throw validateError(400, 'Invalid fields');
//   }

//   const { password: _, ...userWithoutPassword } = login.dataValues;

//   const token = jwt.sign(userWithoutPassword, secret, jwtConfig);

//   return token;
// };

// const getAllUser = async () => {
//   const users = await Users.findAll();

//   return users;
// };

// const getById = async (id) => {
//   const user = await Users.findByPk(id);

//   if (!user) {
//     throw validateError(404, 'User does not exist');
//   }

//   return user;
// };

module.exports = {
  createUser,
  // userLogin,
  // getAllUser,
  // getById,
}; 