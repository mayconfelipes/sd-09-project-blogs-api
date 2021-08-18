/* regras de negócio */
const { User } = require('../models');

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  const regex = /\S+@\S+\.\S+/;
  if (email === '' || !email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  
  if (!regex.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  const registeredEmail = await User.findOne({ where: { email } });
  
  if (registeredEmail) {
    return res.status(409).json({ message: 'User already registered' });
  }
  next();
};

const validateNamePassword = async (req, res, next) => {
  const { displayName, password } = req.body;
  console.log(displayName);
  console.log(password);

  if (displayName.length < 8) {
    return res.status(400).json({ 
      message: '"displayName" length must be at least 8 characters long',
    });
  }

  if (password === '' || !password) {
    return res.status(400).json({ message: '"password" is required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ 
      message: '"password" length must be 6 characters long',
    });
  }

  next();
};

module.exports = {
  validateEmail,
  validateNamePassword,
}; 