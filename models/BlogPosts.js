const BlogPosts = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignkey: true },
    published: 'TIMESTAMP',
    updated: 'TIMESTAMP',
  },
  {
    timestamps: false,
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.Users, 
      {
        foreignkey: 'userId', as: 'user',
      });
  };

  return blogPost;
};

module.exports = BlogPosts;