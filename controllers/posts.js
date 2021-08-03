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
};