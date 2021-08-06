const { User } = require('../models'); 
const err = require('./errors');

const getByEmail = async (email) => User.findOne({ where: { email } });

// const getByPassword = async (password) => User.findOne({ where: { password } });

const userExists = async (email) => {
  const emailExists = await getByEmail(email);
  if (emailExists) throw err('User already registered', 409);
};

module.exports = { userExists };
