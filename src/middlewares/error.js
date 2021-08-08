const HTTP_SERVERERROR_STATUS = 500;

module.exports = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.err });
  }
  return res.status(HTTP_SERVERERROR_STATUS).json({ message: err.message });
};