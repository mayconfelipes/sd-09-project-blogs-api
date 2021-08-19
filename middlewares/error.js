const errorMiddleware = (err, _req, res, _next) => {
  console.log(err);
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  
return res.status(500).json({
     error: {
        message: 'Internal Server Error',
     },
    });
};

  module.exports = {
    errorMiddleware,
  }; 