const { Router } = require('express');

const userRouter = Router();

const { User } = require('../models');
const service = require('../services');

const { status, message } = service;

// REQ04- Busca usuários pelo ID
userRouter.get('/:id', service.auth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if (!result) { 
      return res.status(status.NOT_FOUND).json(message.userNotExist); 
    }
    return res.status(status.OK).json(result);
  } catch (error) {
      return res.status(status.SERVER_ERROR).json(message.SERVER_ERROR);
  }
});

// REQ03- Busca usuários
userRouter.get('/', service.auth, async (req, res) => {
  try {
    const result = await User.findAll();
    return res.status(status.OK).json(result);
  } catch (error) {
      return res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

// REQ01-criar usuário
userRouter.post('/', service.userCheck, service.emailCheck, service.userCreate,
  service.createToken, async (req, res) => {
    // const { userCreated } = req;
    // console.log(userCreated.email);
    const { token } = req;
    try {
      return res.status(status.CREATED).json({ token });
    } catch (error) {
        return res.status(status.SERVER_ERROR).json(message.serverError);
    }
  });

module.exports = userRouter;