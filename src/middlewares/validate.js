require('dotenv').config();
const JOI = require('joi');
const jwt = require('jsonwebtoken');
const { Users, Categories } = require('../../models');
const response = require('./responseCodes');

const genError = (errorCode, message) => ({
  errorCode,
  message,
});

const USER_SCHEMA = JOI.object({
  displayName: JOI.string().min(8),
  email: JOI.string().email().required(),
  password: JOI.string().length(6).required(),
  image: JOI.string(),
});

const BLOG_POST_SCHEMA = JOI.object({
  title: JOI.string().required(),
  content: JOI.string().required(),
  categoryIds: JOI.array().items(JOI.number()).required(),
});

const userDetails = (req, _res, next) => {
  const userInfo = req.body;
  const userIsValid = USER_SCHEMA.validate(userInfo);
  if (userIsValid.error) {
    return next(genError(response.BAD_REQUEST, userIsValid.error.details[0].message));
  }
  return next();
};

const userIsNew = async (req, res, next) => {
  const { email } = req.body;
  const userExists = await Users.findOne({ where: { email } });
  if (userExists) return next(genError(response.CONFLICT, 'User already registered'));
  return next();
};

const userExists = async (req, res, next) => {
  const { email } = req.body;
  const userIsRegistered = await Users.findOne({ where: { email } });
  if (!userIsRegistered) return next(genError(response.BAD_REQUEST, 'Invalid fields'));
  return next();
};

const authUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email, password } });

  if (!user) return res.status(response.BAD_REQUEST).json({ message: 'Campos inválidos' });

  return next();
};

const loginInfo = (req, _res, next) => {
  const { email, password } = req.body;
  const loginIsValid = USER_SCHEMA.validate({ email, password });

  if (loginIsValid.error) {
    return next(genError(response.BAD_REQUEST, loginIsValid.error.details[0].message));
  }

  return next();
};

const authToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return next(genError(response.UNAUTHORIZED, 'Token not found'));
  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findOne({ where: { email: decodedToken.email } });
    console.log(`O valor de user é: ${user}`);
        
    if (!user || !decodedToken) {
      return next(genError(response.UNAUTHORIZED, 'Expired or invalid token'));
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(genError(response.UNAUTHORIZED, 'Expired or invalid token'));
  }
};

const userId = async (req, res, next) => {
  const { id } = req.params;
  const user = await Users.findByPk(id);

  if (!user) return next(genError(response.NOT_FOUND, 'User does not exist'));
  return next();
};

const categoryCreation = (req, _res, next) => {
  const { name } = req.body;
  if (!name) return next(genError(response.BAD_REQUEST, '"name" is required'));
  return next();
};

const newPostInfo = (req, _res, next) => {
  const postInfoIsValid = BLOG_POST_SCHEMA.validate(req.body);
  if (postInfoIsValid.error) {
    return next(genError(response.BAD_REQUEST, postInfoIsValid.error.details[0].message));
  }
  return next();
};

const categoryExists = async (req, _res, next) => {
  const { categoryIds } = req.body;
  const validCategories = await Categories.findAll();
  const postCatValid = categoryIds.every((cat) => validCategories.some((vcat) => vcat.id === cat));
  if (!postCatValid) return next(genError(response.BAD_REQUEST, '"categoryIds" not found'));
  return next();
};

module.exports = {
  userDetails,
  userIsNew,
  userExists,
  loginInfo,
  authUser,
  authToken,
  userId,
  categoryCreation,
  newPostInfo,
  categoryExists,
};