module.exports = (err, _req, res, _next) => {
  const { code, message } = err;
  if (code) {
    res.status(code).json({ message });
  }
  console.log(err);
};   