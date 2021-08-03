module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.STRING,
    published: DataTypes.STRING,
    updated: DataTypes.STRING,
  },
    {
      timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
      tableName: 'BlogPosts',
    });

    BlogPosts.associate = (models) => {
      BlogPosts.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'Users' });
  };

  return BlogPosts;
};