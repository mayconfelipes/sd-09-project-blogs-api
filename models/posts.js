module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName: 'BlogPosts',
  });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return BlogPosts;
};