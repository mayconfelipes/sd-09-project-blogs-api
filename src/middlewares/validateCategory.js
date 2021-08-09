const Joi = require('joi');
const {
  HTTP_BADREQ_STATUS,
} = require('../helpers/statusProtocoloHTTP');

const schemaValidateCategory = Joi.object({
  name: Joi.string().required(),
});

const validateDataCategory = async (req, _res, next) => {
  const { name } = req.body;
  const validateCategory = schemaValidateCategory.validate({
    name,
  });
  if (validateCategory.error) {
    return next({ status: HTTP_BADREQ_STATUS, err: validateCategory.error.details[0].message });
  }
  return next();
};

module.exports = {
  validateDataCategory,
};