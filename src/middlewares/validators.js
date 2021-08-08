const jwt = require('jsonwebtoken');
const { User } = require('../models'); 
const err = require('./errors');

const getByEmail = async (email) => User.findOne({ where: { email } });

const userExists = async (email) => {
  const emailExists = await getByEmail(email);
  if (emailExists) throw err('User already registered', 409);
};

const login = async (email) => {
  const emailExists = await getByEmail(email);
  if (!emailExists) throw err('Invalid fields', 400);
};

const token = async ({ authorization }) => {
  const secret = process.env.JWT_SECRET;
  if (!authorization) {
    throw err('Token not found');
  }
  try {
    const userData = jwt.verify(authorization, secret);
    return userData;
  } catch (error) {
    throw err('Expired or invalid token');
  }
};

module.exports = { userExists, login, token };
