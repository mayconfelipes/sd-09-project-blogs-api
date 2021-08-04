const { postsService } = require('../services');
const { InvalidArgumentError } = require('../errors');

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
  async update(req, res, next) {
    try {
      const payload = req.body;

      if (payload.categoryIds) throw new InvalidArgumentError('Categories cannot be edited');

      const { id } = req.params;
      const { id: userId } = req.user;
      const response = await postsService.update({ ...payload, id, userId, categoryIds: [0] });

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;

      await postsService.remove({ id, userId });

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
  async getByQueryParams(req, res, next) {
    try {
      const { q: query } = req.query;
      const response = await postsService.getByTitleOrContent(query);

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
};