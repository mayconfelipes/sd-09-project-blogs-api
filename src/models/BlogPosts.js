const fieldsBlogPosts = (params) => ({
  id: { type: params.INTEGER, primaryKey: true, autoIncrement: true },
  title: params.STRING,
  content: params.STRING,
  published: params.DATE,
  updated: params.DATE,
});

const configBlogPosts = () => ({
  tableName: 'BlogPosts',
  underscore: true,
});

module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define(
    'BlogPosts',
    fieldsBlogPosts(DataTypes),
    configBlogPosts(),
  );

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'users',
    });
  };

  return BlogPosts;
};
