const userServices = require('../services/userServices');

async function addUser(req, res) {
  const { status, response } = await userServices.addUser(req.body);
  return res.status(status).json(response);
}

async function getUsers(req, res) {
  const { authorization: token } = req.headers;
  const { status, response } = await userServices.getUsers(token);
  return res.status(status).json(response);
}

async function getUserById(req, res) {
  const { id } = req.params;
  const { authorization: token } = req.headers;
  const { status, response } = await userServices.getUserById(id, token);
  return res.status(status).json(response);
}

module.exports = {
  addUser,
  getUsers,
  getUserById,
};
