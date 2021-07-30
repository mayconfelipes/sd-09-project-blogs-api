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

const getAllBlogPosts = async (req, res, next) => {
  try {
    const data = await postService.getAllBlogPosts();
    if (data.message) throw data;
    return res.status(status.OK).json(data);
  } catch (error) {
    return next(error);
  }
};

const getBlogPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await postService.getBlogPostById(id);
    if (data.message) throw data;
    return res.status(status.OK).json(data);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  postObjectValidator,
  getAllBlogPosts,
  getBlogPostById,
};
