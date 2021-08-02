const Post = (sequelize, DataTypes) => {
  const post = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });

  post.associate = (models) => {
    post.belongsTo(models.Users, {
      foreignKey: 'id',
      as: 'user',
    });
  };
  return post;
};

module.exports = Post;
