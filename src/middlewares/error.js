// const errors = {};

module.exports = async (err, _req, res, _next) => {
  // const { error } = err;

  if (err.isJoi) {
    return res.status(400).json({ message: err.details[0].message });
  }

  // if (error) {
  //   const { code, message } = errors[error];
  //   return res.status(code).json({ message });
  // }

  console.error(err);

  return res.status(500).json({
    error: {
      message: `Internal server error: ${err.message}`,
    },
  });
};
