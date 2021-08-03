const { categoriesService } = require('../services');

module.exports = {
  async create(req, res, next) {
    try {
      const payload = req.body;
      const response = await categoriesService.create(payload);

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
  async getAll(_req, res, next) {
    try {
      const response = await categoriesService.getAll();

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
};