const jwt = require('jsonwebtoken');
const { User } = require('../models'); 
const { Category } = require('../models'); 
const err = require('./errors');

const getByEmail = async (email) => User.findOne({ where: { email } });

const getById = async (id) => User.findByPk(id);

const idExists = async (id) => {
  const idResponse = await getById(id);
  if (!idResponse) throw err('User does not exist', 404);
};

const userExists = async (email) => {
  const emailExists = await getByEmail(email);
  if (emailExists) throw err('User already registered', 409);
};

const login = async (email) => {
  const emailExists = await getByEmail(email);
  if (!emailExists) throw err('Invalid fields', 400);
};

const token = async ({ authorization }) => {
  if (!authorization) {
    throw err('Token not found');
  }
  try {
    const payload = jwt.verify(authorization, process.env.JWT_SECRET);
    return payload.email;
  } catch (error) {
    throw err('Expired or invalid token');
  }
};

const getCategories = async () => Category.findAll();

const categoryIdsValidation = async (categoryIds) => {
  const response = await getCategories();
  categoryIds.forEach((id) => {
    if (!(response.some(({ dataValues }) => dataValues.id === id))) {
      throw err('"categoryIds" not found', 400);
    }
  });
};

module.exports = { 
  userExists,
  login, 
  token, 
  getById, 
  getByEmail,
  idExists,
  categoryIdsValidation,
};
