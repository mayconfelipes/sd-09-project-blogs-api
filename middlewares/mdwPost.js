const postService = require('../services/postService');
const status = require('../services/statusCode');

const postObjectValidator = async (req, res, next) => {
  try {
    const { title, content, categoryIds, userLoged } = req.body;
    const dataVerifiedObject = await postService.postObjectValidator(title, content, categoryIds);
    if (dataVerifiedObject.message) throw dataVerifiedObject;
    const data = await postService.postObject(title, content, categoryIds, userLoged.id);
    if (data.message) throw data;
    return res.status(status.created).json(data);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  postObjectValidator,
};
