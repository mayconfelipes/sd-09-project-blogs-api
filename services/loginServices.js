const { User } = require('../models');

const generateToken = require('../middlewares/generateToken');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    throw Object.assign(
      new Error('Invalid fields'),
      { code: 'badRequest' },
   );
  }

  const token = generateToken({ email });

  return token;
};

module.exports = { 
  login,
};