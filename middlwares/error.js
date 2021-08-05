const handleError = (error, _req, res, _next) => {
  console.log('no midd de error');
  if (error.msg) {
    return res.status(error.status).json({ message: error.msg });
  }
  if (error.message) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = handleError;
