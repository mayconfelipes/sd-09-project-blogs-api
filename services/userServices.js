const { User } = require('../models');

const generateToken = require('../middlewares/generateToken');

const create = async (name, email, password, image) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    throw Object.assign(
      new Error('User already registered'),
      { code: 'conflict' },
   );
  }

  await User.create({ name, email, password, image });

  const token = generateToken({ name, email, image });

  return token;
};

module.exports = { 
  create,
};
