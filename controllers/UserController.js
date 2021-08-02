const { validationResult, matchedData } = require('express-validator');
const { User } = require('../models');
const UserService = require('../services/UserService');

module.exports = {
  addUser: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { code, message } = errors.errors[0].msg;
      return res.status(code).json({ message });
    }
    const data = matchedData(req);
    const userSearch = await User.findAll({ where: { email: data.email } });
    if (userSearch.length > 0) {
      return res.status(409).json({ message: 'User already registered' });
    }
    const user = await User.create(data);
    const { code, token } = await UserService.generateToken(user);
    return res.status(code).json({ token });
  },
  login: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { code, message } = errors.errors[0].msg;
      return res.status(code).json({ message });
    }
    const data = matchedData(req);
    const user = await User.findAll({
      where: { email: data.email, password: data.password },
    });
    if (user.length === 0) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    const { token } = await UserService.generateToken(user);
    return res.status(200).json({ token });
  },
  listAll: async (req, res) => {
    const token = req.headers.authorization;
    const auth = await UserService.verifyToken(token);
    if (auth.code !== undefined) {
      const { code, message } = auth;
      return res.status(code).json({ message });
    }
    const users = await User.findAll();
    res.status(200).json(users);
  },
  listOne: async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization;
    const auth = await UserService.verifyToken(token);
    if (auth.code !== undefined) {
      const { code, message } = auth;
      return res.status(code).json({ message });
    }
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json(user);
  },
};
