const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

// Metodo inspirado Aula validacao com joi marioto feat aluno mauro henrique turma sd-09 / 
const schemaUser = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

 const schemaUserLogin = Joi.object({
   email: Joi.string().email().required(),
   password: Joi.string().length(6).required(),
 });

// eslint-disable-next-line max-lines-per-function
const createUser = async (displayName, email, password, image) => {
   const { error } = schemaUser.validate({ displayName, email, password });
   console.log(error, 'antes'); 
  if (error) {
      return {
      isError: true,
      err: { message: error.details[0].message },
      status: StatusCodes.BAD_REQUEST,
    };
  }

  const user = await Users.findOne({ where: { email } });

  if (user) {
    return {
    isError: true,   
    err: { message: 'User already registered' },
    status: StatusCodes.CONFLICT,
  };
  }
  const newUser = await Users.create({ displayName, email, password, image });

  const { password: _, ...userWithoutPassword } = newUser.dataValues;

  const token = jwt.sign(userWithoutPassword, secret, jwtConfig);

  return token;
};

 const userLogin = async (email, password) => {
   const { error } = schemaUserLogin.validate({ email, password });
   if (error) {
    return {
      isError: true,
      err: { message: error.details[0].message },
      status: StatusCodes.BAD_REQUEST,
    };
   }
   const login = await Users.findOne({ where: { email, password } });
   
   if (!login) {
    return { isError: true,
       err: { message: 'Invalid fields' },
      status: StatusCodes.BAD_REQUEST,
    };
   }

   const { password: _, ...userWithoutPassword } = login.dataValues;

   const token = jwt.sign(userWithoutPassword, secret, jwtConfig);

   return token;
 };

 const getAllUser = async () => {
   const users = await Users.findAll();

   return users;
 };

 const getById = async (id) => {
   const user = await Users.findByPk(id);

   if (!user) {
    return {
      isError: true,
      err: { message: 'User does not exist' },
      status: StatusCodes.NOT_FOUND,
    };
   }

   return user;
 };

module.exports = {
  createUser,
   userLogin,
   getAllUser,
   getById,
}; 