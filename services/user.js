/* regras de negócio */
const { User } = require('../models');

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
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

const validateName = async (req, res, next) => {
  const { displayName } = req.body;
  
  if (displayName.length < 8) {
    return res.status(400).json({ 
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  
  next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;
  
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

const validateLoginEmail = async (req, res, next) => {
  const { email } = req.body;
  if (email === '' || email === null) {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  next();
};

const validateLoginPassword = async (req, res, next) => {
  const { password } = req.body;
  if (password === '' || password === null) {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  next();
};

module.exports = {
  validateEmail,
  validateLoginEmail,
  validateLoginPassword,
  validateName,
  validatePassword,
}; 