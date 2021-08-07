const error = (status, message) => ({ status, message });

const validateCategory = async (req, _res, next) => {
  try {
    const { name } = req.body;
    if (name === undefined) throw error(400, '"name" is required');
    next();
  } catch (err) {
    next({ status: 400, message: '"name" is required' });
  }
};

module.exports = { validateCategory };
