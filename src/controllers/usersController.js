const express = require('express');
const { generateToken, validateToken } = require('../middlewares/auth');
const { getAllUsers, addUser, getUserById, removeUser } = require('../services/usersServices');

const router = express.Router();

router.get('/', validateToken, async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.get('/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(user);
  } catch (error) {
    res.status(error.response).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const response = await addUser(req.body);
    if (response.newUser) {
      const tokenCode = generateToken(response.newUser);
      res.status(response.response).json({ token: tokenCode });
    }
    res.status(response.response).json(response.message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/me', validateToken, async (req, res) => {
  try {
    await removeUser(req.user.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;