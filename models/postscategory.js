module.exports = (sequelize) => {
  const PostsCategory = sequelize.define('PostsCategory', {}, { timestamps: false });
  return PostsCategory;
};