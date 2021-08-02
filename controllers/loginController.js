const rescue = require('express-rescue');
const Joi = require('joi');
const validate = require('../middelwares/validate');
const { loginService } = require('../services/loginService');
const { createToken } = require('../utils/createToken');

const loginSchema = Joi.object({
    email: Joi
      .string()
      .email()
      .not().empty()
      .required(),
    password: Joi.string().not().empty().required(),
}); 

const login = [
    validate(loginSchema),
    rescue(async (req, res, next) => {
      const { email, password } = req.body;
      const loginUser = await loginService(email, password);
      if (loginUser.error) return next({ statusCode: 400, message: loginUser.error });

      const { displayName, image, id } = loginUser;
      const token = createToken({ displayName, email, image, id });

      return res.status(200).json({ token });
})];

module.exports = { login };