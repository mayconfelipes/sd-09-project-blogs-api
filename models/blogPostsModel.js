const defineBlogPostsModel = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: 'TIMESTAMP',
    updated: 'TIMESTAMP',
  },
  {
    timestamps: false,
    tableName: 'BlogPosts',
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };
  return blogPost;
};

module.exports = defineBlogPostsModel;