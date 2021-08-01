const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const validateRecipeData = (code, message) => ({ code, message });

async function recipeValidate(req, _res, next) {
  const token = req.headers.authorization;
  if (!token) {
    next(validateRecipeData(401, 'missing auth token'));
  }
  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    const { _id: id } = decoded;

    console.log(id);

    req.userId = id;
  } catch (_err) {
    next(validateRecipeData(401, 'jwt malformed'));
  }
  next();
}

module.exports = {
  recipeValidate,
}; 