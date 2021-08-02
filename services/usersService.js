const Joi = require('joi');
const { User } = require('../models');
const { InvalidArgumentError } = require('../errors');
const tokens = require('../tokens');

const UserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

module.exports = {
  async create(payload) {
    const { error } = UserSchema.validate(payload);

    if (error) {
      const [details] = error.details;
      throw new InvalidArgumentError(details.message);
    }

    const userData = await User.create(payload);
    const { email } = userData;
    const token = tokens.access.create({ email });
    return { token };
  },
  async getAll() {
    return User.findAll();
  },
};