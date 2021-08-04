const { usersService } = require('../services');

module.exports = {
  async create(req, res, next) {
    try {
      const payload = req.body;
      const response = await usersService.create(payload);

      return res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
  async getAll(_req, res, next) {
    try {
      const response = await usersService.getAll();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const response = await usersService.getById(id);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
  async deleteOwnUser(req, res, next) {
    try {
      const { id } = req.user;

      await usersService.remove(id);

      res.status(204).json();
    } catch (err) {
      next(err);
    }
  },
};