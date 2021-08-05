module.exports = (sequelize, DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory', {}, { timestamps: false });
  return PostsCategory;
};