const { User } = require('../../models');

module.exports = async (id) => {
  const result = await User.findByPk(id);

  if (result === null) throw Error('User does not exist');

  return result;
};
