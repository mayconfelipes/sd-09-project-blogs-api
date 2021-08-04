const { Users } = require('../models');

const userMiddl = async (req, res, next) => {
  const test = await await Users.findAll();
  console.log(test);
  next();
};

module.exports = userMiddl;