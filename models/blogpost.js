module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      // userId: DataTypes.INTEGER,
    });

    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User, { as: 'user', foreingKey: 'userId' });
    };

  return BlogPost;
};
