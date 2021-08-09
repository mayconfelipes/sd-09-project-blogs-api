const BlogPost = (sequelize, DataTypes) => {
  const blogpost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    createdAt: { type: DataTypes.DATE, field: 'published' },
    updatedAt: { type: DataTypes.DATE, field: 'updated' },
  }, { timestamps: true });
  blogpost.associate = (models) => {
    blogpost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return blogpost;
};

module.exports = BlogPost;
