module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.Users,
      { as: 'user', foreignKey: 'userId' });
    };

  // BlogPost.associate = (models) => {
  //   BlogPost.hasOne(models.Category, 
  //     { as: 'category', foreignKey: 'categoryId' });
  // };
  return BlogPost;
};