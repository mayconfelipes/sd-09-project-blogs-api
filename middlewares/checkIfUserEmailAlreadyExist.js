const { User } = require('../models/index');

const checkIfUserEmailAlreadyExist = async (req, res, next) => {
  const { email } = req.body;

  const userEmailAlreadyExist = await User.findOne({ where: { email } });

    if (userEmailAlreadyExist) {
      return res.status(409).send({ message: 'User already registered' });
    }
    return next();
};

module.exports = checkIfUserEmailAlreadyExist; 
