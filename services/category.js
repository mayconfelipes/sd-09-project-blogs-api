// const { Category } = require('../models');
const { status, message } = require('./statusMessages');

const categoryCheck = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(status.BAD_REQUEST).json(message.categoryNameRequired);
  } 
  return next();
};

module.exports = { categoryCheck };