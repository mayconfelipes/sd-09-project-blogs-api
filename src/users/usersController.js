const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  res.status(200).json({ displayName, email, password, image });
};

module.exports = {
  create,
};