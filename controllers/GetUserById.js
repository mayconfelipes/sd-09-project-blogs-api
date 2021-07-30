const { User } = require('../models');

const GetUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne(
    { where: { id } },
    {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    },
  );
  if (!user) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(user);
};

module.exports = GetUserById;
