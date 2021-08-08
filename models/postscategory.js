const PostsCategory = (sequelize, _DataTypes) => {
  const postsCategory = sequelize.define('PostCategory', {}, { timestamps: false });
  return postsCategory;
};

module.exports = PostsCategory;
