const express = require('express');
const { User } = require('../models');

const router = express.Router();

const { validateNewUser } = require('../middlewares/users');
const { auth } = require('../middlewares/auth');

const ok = 200;
const created = 201;
const badRequest = 400;
const notFound = 404;
const conflict = 409;
const internalServerError = 500;

router.get('/', auth, async (_req, res) => {
  try {
    const users = await User.findAll();

    return res.status(ok).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(internalServerError).json({ message: 'Algo deu errado' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(notFound).json({ message: 'User does not exist' });

    return res.status(ok).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(internalServerError).json({ message: 'Algo deu errado' });
  }
});

router.post('/', validateNewUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;

    if (!email) { 
      return res.status(badRequest).json({ message: '"email" is required' }); 
    }

    if (!password) { 
      return res.status(badRequest).json({ message: '"password" is required' }); 
    }

    const userEmail = await User.findOne({ where: { email } });
    if (userEmail) return res.status(conflict).json({ message: 'User already registered' });

  try {
    const newUser = await User.create({ displayName, email, password, image });

    return res.status(created).json(newUser);
  } catch (e) {
    console.log(e.message);
    res.status(internalServerError).json({ message: 'Algo deu errado' });
  }
});

router.delete('/me', auth, async (req, res) => {
  const { email } = req.user;

  await User.destroy({ where: { email } });

  return res.status(204).json({});
});

module.exports = router;