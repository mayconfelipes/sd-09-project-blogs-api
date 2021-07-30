const rescue = require('express-rescue');
const Joi = require('joi');
const validate = require('../middelwares/validate');

const { createToken } = require('../utils/createToken');
const { createUserService } = require('../services/createUser');

const userSchema = Joi.object({
    displayName: Joi.string().min(8),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.string(),
});

const createUser = [
    validate(userSchema),
    rescue(async (req, res) => {
      const { displayName, email, password, image } = req.body;
      await createUserService(displayName, email, password, image);
      const token = createToken({ displayName, email, password, image });
      
      return res.status(201).json({ token });
})];

module.exports = {
    createUser,
};
