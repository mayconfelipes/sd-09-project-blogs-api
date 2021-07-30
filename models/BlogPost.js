const BlogPost = (sequelize, DataTypes) => {
  const newBlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false });

  newBlogPost.associate = (models) => {
    newBlogPost.belongsTo(models.User, {
      foreignKey: 'userId', 
      as: 'user',
    });
  };

  return newBlogPost;
};

module.exports = BlogPost;