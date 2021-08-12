const { User } = require('../models/index');

const checkEmail = async (req, res, next) => {
    const { email } = req.body;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const userAlreadyExist = await User.findOne({ where: { email } });

    if (!email) {
      return res.status(400).send({ message: '"email" is required' });
    }

    if (!validEmail.test(email)) {
      return res.status(400).send({ message: '"email" must be a valid email' });
    }

    if (userAlreadyExist) {
      return res.status(409).send({ message: 'User already registered' });
    }
    return next();
  };
  
  module.exports = checkEmail;