const fieldsBlogPosts = (params) => ({
  id: { type: params.INTEGER, primaryKey: true, autoIncrement: true },
  title: params.STRING,
  content: params.STRING,
  // Definindo valor default como no migrate
  published: { type: params.DATE, allowNull: false, defaultValue: params.NOW },
  updated: { type: params.DATE, allowNull: false, defaultValue: params.NOW },
});

const configBlogPosts = () => ({
  timestamps: false,
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
