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

module.exports = { userExists, login };
