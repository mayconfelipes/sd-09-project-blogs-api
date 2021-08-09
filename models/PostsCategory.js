module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategories', {
    categoryId: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  return PostCategory;
};
