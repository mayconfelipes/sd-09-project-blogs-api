const { User } = require('../models');

const badRequest = 400;
module.exports = async (req, res, next) => {
  const { email } = req.body;
  const existEmail = await User.findOne({ where: { email } });

  if (!existEmail) return res.status(badRequest).json({ message: 'Invalid fields' });
  
  return next();
};