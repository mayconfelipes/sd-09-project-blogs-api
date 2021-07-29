const PostCategory = (sequelize, DataTypes) => {
  const postCategories = sequelize.define('PostCategories', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  });
  
  postCategories.associate = (models) => {
    postCategories.hasOne(models.categories,
      { foreignKey: 'id', as: 'category' });
  };

  postCategories.associate = (models) => {
    postCategories.hasOne(models.blogposts,
      { foreignKey: 'id', as: 'post' });
  };

  return postCategories;
};

module.exports = PostCategory;
