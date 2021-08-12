const { User } = require('../models/index');

const checkIfUserAlreadyExist = async (req, res, next) => {
  const { email } = req.body;

  const userAlreadyExist = await User.findOne({ where: { email } });

    if (userAlreadyExist) {
      return res.status(409).send({ message: 'User already registered' });
    }
    return next();
};

module.exports = checkIfUserAlreadyExist;