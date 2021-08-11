const BlogPost = (sequelize, DataTypes) => {
  const BlogPostModel = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  { timestamps: false, tableName: 'BlogPosts' });
  BlogPostModel.associate = (models) => {
    BlogPostModel.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return BlogPostModel;
};
module.exports = BlogPost;
