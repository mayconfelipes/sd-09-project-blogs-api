const routes = require('express').Router();
const authMiddleware = require('../../../middlewares/authMiddleware');
const Services = require('../services/index');
const { STATUS_OK, STATUS_CREATED, STATUS_NO_CONTENT } = require('../../../utils/RestCodes');

routes.post('/', async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const token = await Services.save({ displayName, email, password, image });

  if (token.error) return next(token);

  res.status(STATUS_CREATED).json(token);
});

routes.use(authMiddleware);

routes.get('/', async (_req, res, next) => {
  const users = await Services.all();

  if (users.error) return next(users);

  res.status(STATUS_OK).json(users);
});

routes.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  const user = await Services.byId(id);

  if (user.error) return next(user);

  res.status(STATUS_OK).json(user);
});

routes.delete('/me', async (req, res, next) => {
  const { id } = req.user; 

  const response = await Services.deleteUser(id);

  if (response.error) return next(response);

  res.status(STATUS_NO_CONTENT).end();
});

module.exports = routes;