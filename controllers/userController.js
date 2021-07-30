const rescue = require('express-rescue');
const Joi = require('joi');
const validate = require('../middelwares/validate');
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
      const token = await createUserService(displayName, email, password, image);
      res.status(201).json({ token });
})];

module.exports = {
    createUser,
};
