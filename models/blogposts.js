const BlogPost = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false });
  blogPosts.associate = (models) => {
    blogPosts.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user',
    });
  };

  return blogPosts;
};

module.exports = BlogPost;