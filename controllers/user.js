const rescue = require('express-rescue');
const { checkNewUser, getUser, createUser, findUsers } = require('../services/user');

const newUser = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  
  const { error } = checkNewUser({ displayName, email, password, image });
  if (error) return res.status(400).json(error.details[0]);

  const user = await getUser(email);
  if (user) return res.status(409).json({ message: 'User already registered' });

  const created = await createUser({ displayName, email, password, image });
  if (created.err) return res.status(500).json({ message: created.err.message });

  return res.status(201).json({ token: req.token });
});

const getUsers = rescue(async (req, res) => {
  console.log('heyyy');
  const users = await findUsers();
  return res.status(200).json(users);
});

module.exports = { newUser, getUsers };