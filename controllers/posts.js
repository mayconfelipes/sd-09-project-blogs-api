const { postsService } = require('../services');

module.exports = {
  async create(req, res, next) {
    try {
      const payload = req.body;
      const { id: userId } = req.user;
      const response = await postsService.create({ ...payload, userId });

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
  async getAll(_req, res, next) {
    try {
      const response = await postsService.getAll();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const response = await postsService.getById(id);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
};