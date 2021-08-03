module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.STRING,
  },
  { timestamps: false, tableName: 'BlogPosts', underscored: false });
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, 
      { foreignKey: 'userId', as: 'users' });
    BlogPost.hasMany(models.PostCategory,
      { foreignKey: 'post_id', as: 'posts' });
  };
  return BlogPost;
};