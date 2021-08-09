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

const getAll = async () => {
  const users = await User.findAll();

  const userData = users.map(({ dataValues }) => {
    const { password: _, ...data } = dataValues;

    return data;
  });

  return userData;
};

const getById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw Object.assign(
      new Error('User does not exist'),
      { code: 'notFound' },
   );
  }
  
  const { password: _, ...dataValues } = user.dataValues;

  return dataValues;
};

module.exports = { 
  create,
  getAll,
  getById,
};
