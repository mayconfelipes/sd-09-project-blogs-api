const routes = require('express').Router();

const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');
const postRouter = require('./postRouter');

routes.use('/', userRouter);
routes.use('/', categoryRouter);
routes.use('/', postRouter);

module.exports = routes;