module.exports = (sequelize, DataTypes) => {
  const PostCategoryStructure = sequelize.define('PostCategory', {
    categoryId: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  return PostCategoryStructure;
};
