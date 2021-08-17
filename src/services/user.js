const Joi = require('joi');

const { Users } = require('../models');
const createAuth = require('../middlewares/createAuth');

// validadores
const objectError = (code, message) => ({
  code,
  message,
});

const JoiSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).required(),
});

const validateData = (userWithoutImage) => {
  const { error } = JoiSchema.validate(userWithoutImage);

  if (error) {
    throw objectError('BAD_REQUEST', error.details[0].message);
  }
};

const verifyEmailExists = async (email) => {
  const emailDB = await Users.findOne({ where: { email } });

  if (emailDB) {
    throw objectError('CONFLICT', 'User already registered');
  }
};

// functions
const create = async (data) => {
  const { image, ...userWithoutImage } = data;

  validateData(userWithoutImage);
  await verifyEmailExists(data.email);

  const users = await Users.create({ ...data });
  const { password, image: imageDB, ...userWithoutImagePassword } = users;

  const token = createAuth(userWithoutImagePassword);

  return { token };
};

module.exports = {
  create,
};
