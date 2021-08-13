const checkTitleAndContentPost = (req, res, next) => {
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).send({
      message: '"title" is required',
    }); 
  }

  if (!content) {
    return res.status(400).send({
      message: '"content" is required',
    });
  }

  return next();
};

module.exports = checkTitleAndContentPost;