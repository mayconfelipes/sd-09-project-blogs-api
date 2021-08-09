const express = require('express');
const { getAllUsers, getUserById, addUser } = require('../services/usersServices');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(error.response).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(error.response).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const response = await addUser(req.body);
    res.status(response.response).json(response.message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/me', (req, res) => {
  res.status(200).json({ item: 'ok' });
});

module.exports = router;