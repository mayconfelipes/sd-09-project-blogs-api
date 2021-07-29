const CustomError = require('./CustomError');

module.exports = (schema, data) => {
  const { error } = schema.validate(data);
  if (error) throw new CustomError(error.details[0].message, 400);
};
