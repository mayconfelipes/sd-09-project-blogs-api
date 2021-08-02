module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER, // ? foreign key tem que especificar?
    published: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'BlogPosts',
    underscored: true,
  });
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.Users, 
      { foreignKey: 'user_id', as: 'users' });
    BlogPost.hasMany(models.PostsCategories,
      { foreignKey: 'post_id', as: 'users' });
  };
  return BlogPost;
};