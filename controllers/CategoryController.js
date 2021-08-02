const { validationResult, matchedData } = require('express-validator');
const UserService = require('../services/UserService');
const { Category } = require('../models');

module.exports = {
  addCategory: async (req, res) => {
    const token = req.headers.authorization;
    const auth = await UserService.verifyToken(token);
    if (auth.code !== undefined) {
      const { code, message } = auth;
      return res.status(code).json({ message });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { code, message } = errors.errors[0].msg;
      return res.status(code).json({ message });
    }
    const data = matchedData(req);
    console.log(data);
    const category = await Category.create(data);
    res.status(201).json(category);
  },
  listAll: async (req, res) => {
    const token = req.headers.authorization;
    const auth = await UserService.verifyToken(token);
    if (auth.code !== undefined) {
      const { code, message } = auth;
      return res.status(code).json({ message });
    }
    const categories = await Category.findAll();
    res.status(200).json(categories);
  },
};
