const userServices = require('../services/userServices');

async function addUser(req, res) {
  const { status, response } = await userServices.addUser(req.body);
  res.status(status).json(response);
}

module.exports = {
  addUser,
};
