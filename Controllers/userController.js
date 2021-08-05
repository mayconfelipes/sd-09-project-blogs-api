const createUser = async (req, res, _next) => {
  const user = req.body;
  res.status(201).json({ user });
};

const getAllUsers = async (req, res, _next) => res.status(200).json(req.body);

const getUserById = async (req, res, _next) => {
  const user = 'deu bom';
  return res.status(200).json(user);
};

module.exports = { createUser, getAllUsers, getUserById };
