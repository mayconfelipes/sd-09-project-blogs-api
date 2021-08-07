module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    createdAt: { type: DataTypes.DATE, field: 'published' },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated',
    },
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return BlogPost;
};
