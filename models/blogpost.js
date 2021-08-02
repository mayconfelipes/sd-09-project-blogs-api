module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    createdAt: { type: DataTypes.DATE, field: 'published', name: 'published' },
    updatedAt: { type: DataTypes.DATE, field: 'updated', name: 'updated' },
    userId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
  }, { tableName: 'BlogPosts', createdAt: 'published', updatedAt: 'updated' });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  
  return BlogPost;
};
