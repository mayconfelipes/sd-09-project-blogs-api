const HTTP_INTERNAL_ERROR = 500;

const errors = {
  invalidData: ({ message }) => ({ status: 400, message }),
  invalidToken: ({ message }) => ({ status: 401, message }),
  notFound: ({ message }) => ({ status: 404, message }),
  invalidEmail: ({ message }) => ({ status: 409, message }),
};

module.exports = (err, _req, res, _next) => {
  if (errors[err.name]) {
    const { status, message } = errors[err.name](err);
    return res.status(status).json({ message });
  }
  console.log(err);
  res.status(HTTP_INTERNAL_ERROR).json({ message: err.message });
};
