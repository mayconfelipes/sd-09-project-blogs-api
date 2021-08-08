const routes = require('express').Router();
const Services = require('../services/index');
const { STATUS_OK, STATUS_CREATED, STATUS_NO_CONTENT } = require('../../../utils/RestCodes');

routes.post('/', async (req, res, next) => {
  const { title, categoryIds, content } = req.body;
  const { id } = req.user;

  const post = await Services.save({ title, categoryIds, content }, id);

  if (post.error) return next(post);

  res.status(STATUS_CREATED).json(post);
});

routes.get('/', async (_req, res, next) => {
  const posts = await Services.all();

  if (posts.error) return next(posts);

  res.status(STATUS_OK).json(posts);
});

routes.get('/search', async (req, res, next) => {
  const { q } = req.query;

  console.log(q);
  
  const post = await Services.byQuery(q);

  if (post.error) return next(post);

  res.status(STATUS_OK).json(post);
});

routes.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  const post = await Services.byId(id);

  if (post.error) return next(post);

  res.status(STATUS_OK).json(post);
});

routes.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const post = await Services.update(req.body, id, userId);

  if (post.error) return next(post);

  res.status(STATUS_OK).json(post);
});

routes.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const post = await Services.deletePost(id, userId);

  if (post.error) return next(post);

  res.status(STATUS_NO_CONTENT).end();
});

module.exports = routes;