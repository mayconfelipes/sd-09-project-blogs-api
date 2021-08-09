const { Router } = require('express');

const { valUser } = require('../middlewares/userValidation');
const { tokenCreate, checkToken } = require('../helpers/jwt');
const { Users } = require('../models');

const router = new Router();

router.post('/', valUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await Users.findOne({ where: { email } });

  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }

  await Users.create({ displayName, email, password, image });

  const token = tokenCreate(email);

  return res.status(201).json({ token });
});

router.get('/', checkToken, async (_req, res) => {
  const users = await Users.findAll({});

  return res.status(200).json(users);
});

router.get('/:id', checkToken, async (req, res) => {
  const { id } = req.params;

  const user = await Users.findOne({ where: { id } });

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  return res.status(200).json(user);
});

router.delete('/me', checkToken, async (req, res) => {
  const { email } = req.user;

  await Users.destroy({ where: { email } });

  return res.status(204).json({});
});

module.exports = router;
