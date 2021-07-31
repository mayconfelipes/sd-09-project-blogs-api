const rescue = require('express-rescue');
const { usersService } = require('../services');

const create = rescue(async (req, res) => {
    const { token } = req;
    await usersService.createUser(req.body);

    return res.status(201).json({ token });
  });

module.exports = {
  create,
};
