const Post = (sequelize, DataTypes) => {
  const CurrPost = sequelize.define('Post', {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Posts',
    // underscore: true,
  });

  return CurrPost;
};

module.exports = Post;