const create = async (req, res) => {
  const { name } = req.body;
  // const { id } = await categoriesServices.create({ name });
  return res
    .status(201)
    .json({ 
      // id, 
      name, 
    });
};

module.exports = {
  create,
};