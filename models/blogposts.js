/* este codigo foi desenvolvido com a trica de 9 16 : Joao Vitor, Joao Pedro e ANtonio arieiro && WARROM */

const createBlogPost = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  },
  {
    createdAt: 'published',
    updatedAt: 'updated',
  });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'user' });
  };

  return BlogPosts;
};

module.exports = createBlogPost;
